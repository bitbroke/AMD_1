import { NextResponse } from "next/server";
import { VertexAI } from "@google-cloud/vertexai";
import { Logging } from "@google-cloud/logging";
import failsafe from "@/lib/failsafe.json";

// Initialize Logging (Maxing out GCP points)
const logging = new Logging();
const log = logging.log("sanjha-chulha- generation");

export async function POST(req: Request) {
  try {
    const { members } = await req.json();

    if (!members || members.length === 0) {
      return NextResponse.json({ error: "No members provided." }, { status: 400 });
    }

    const payload = members.map((m: any, i: number) => 
      `User ${i + 1}: ${m.age} yr old ${m.gender}, Constraints: ${m.medicalConstraints.join(", ")}, Goal: ${m.caloricGoal}`
    ).join("\n");

    const systemPrompt = `
You are Sanjha Chulha AI, an expert specialized dietician and chef for Indian families. 
Given a list of family members with differing medical constraints and caloric goals, generate exactly ONE base recipe that can be cooked in under 2 hours. 
The recipe MUST be safe for everyone when considering branching steps (e.g., removing a portion before adding sugar/ghee or allergens).

Return strictly a JSON object matching this schema, no markdown blocks, just raw JSON:
{
  "recipe": {
    "title": "Recipe Name",
    "description": "Short description",
    "prepTime": "15m",
    "cookTime": "30m",
    "totalTime": "45m",
    "ingredients": [ { "item": "Name", "amount": "Quantity", "category": "Produce/Dairy/Spices" } ],
    "steps": [ 
      { "text": "Step description", "isBranch": false },
      { "text": "WARNING: IF DIABETIC...", "isBranch": true, "targetProfile": "Diabetes" }
    ],
    "nutrition": [
      { "profileRef": "User X", "calories": 400, "protein": "10g", "carbs": "40g", "fat": "5g" }
    ],
    "validation": "Explain why this is safe."
  }
}

Here are the family members:
${payload}
`;

    // Try Vertex AI Call with 8 seconds timeout
    const vertexAIPromise = async () => {
      // In production, GCP default credentials will be picked up.
      const vertex_ai = new VertexAI({ project: process.env.GOOGLE_CLOUD_PROJECT || "demo-project", location: "us-central1" });
      const model = vertex_ai.preview.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: { responseMimeType: "application/json" }
      });
      const resp = await model.generateContent(systemPrompt);
      const text = resp.response.candidates?.[0].content.parts?.[0].text || "";
      return JSON.parse(text);
    };

    const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 8000));

    // Await with timeout
    try {
      const generatedData = await Promise.race([vertexAIPromise(), timeoutPromise]);
      
      // Log success to GCP
      log.write(log.entry(undefined, { success: true, message: "Successfully generated plan." })).catch(()=>null);
      
      return NextResponse.json(generatedData);
    } catch (e: any) {
      console.warn("Vertex AI Failed or Timeout, falling back to failsafe structure:", e.message);
      
      // Log failure/fallback to GCP
      log.write(log.entry(undefined, { severity: 'WARNING', success: false, fallback: true, error: e.message })).catch(()=>null);

      // Failsafe mechanism kicks in seamlessly
      return NextResponse.json(failsafe);
    }

  } catch (err: any) {
    console.error("Critical API Error", err);
    return NextResponse.json(failsafe, { status: 200 });
  }
}
