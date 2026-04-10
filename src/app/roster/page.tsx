"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFamilyStore, MedicalConstraint, CaloricGoal, FamilyMember } from "@/store/familyStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus, ArrowRight } from "lucide-react";

const CONSTRAINTS: MedicalConstraint[] = [
  "Diabetes", "Lactose Intolerance", "Gluten Free", "Low Sodium", "Nut Allergy", "None"
];

export default function RosterPage() {
  const router = useRouter();
  const { members, addMember, removeMember } = useFamilyStore();
  
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [gender, setGender] = useState("Male");
  const [constraints, setConstraints] = useState<MedicalConstraint[]>(["None"]);
  const [caloricGoal, setCaloricGoal] = useState<CaloricGoal>("Maintenance");

  const toggleConstraint = (c: MedicalConstraint) => {
    if (c === "None") {
      setConstraints(["None"]);
      return;
    }
    setConstraints((prev) => {
      const filtered = prev.filter(x => x !== "None");
      if (filtered.includes(c)) {
        const next = filtered.filter(x => x !== c);
        return next.length === 0 ? ["None"] : next;
      }
      return [...filtered, c];
    });
  };

  const handleAdd = () => {
    if (!name || !age) {
      alert("Name and age are required.");
      return;
    }
    addMember({
      name,
      age: Number(age),
      gender,
      medicalConstraints: constraints,
      caloricGoal
    });
    
    // Reset form
    setName("");
    setAge("");
    setGender("Male");
    setConstraints(["None"]);
    setCaloricGoal("Maintenance");
  };

  return (
    <div className="container max-w-screen-md mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-500">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Family Roster</h1>
        <p className="text-muted-foreground">
          Configure dietary constraints for up to 5 family members.
        </p>
      </div>

      {/* Existing Members */}
      <div className="space-y-4">
        {members.map((m) => (
          <Card key={m.id} className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-[var(--emerald)]" />
            <CardHeader className="py-4 px-6 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl">{m.name} <span className="text-sm font-normal text-muted-foreground">({m.age}, {m.gender})</span></CardTitle>
                <CardDescription className="mt-1">
                  Goal: {m.caloricGoal} | Constraints: {m.medicalConstraints.join(", ")}
                </CardDescription>
              </div>
              <Button variant="ghost" size="icon" onClick={() => removeMember(m.id)} className="text-destructive">
                <Trash2 className="h-5 w-5" />
              </Button>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Add Member Form */}
      {members.length < 5 && (
        <Card className="border-2 border-dashed bg-muted/20">
          <CardHeader>
            <CardTitle>Add Member ({members.length}/5)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="E.g. Dada" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="number" placeholder="65" value={age} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAge(e.target.value ? Number(e.target.value) : "")} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Gender</Label>
                <Select value={gender} onValueChange={(v) => setGender(v || "Male")}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Caloric Goal</Label>
                <Select value={caloricGoal} onValueChange={(v) => setCaloricGoal(v as CaloricGoal)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Deficit">Deficit (Weight Loss)</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                    <SelectItem value="Surplus">Surplus (Growth)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <Label>Medical / Dietary Constraints</Label>
              <div className="flex flex-wrap gap-2">
                {CONSTRAINTS.map((c) => {
                  const isActive = constraints.includes(c);
                  return (
                    <Button
                      key={c}
                      type="button"
                      variant={isActive ? "default" : "outline"}
                      className={`rounded-full h-8 px-4 text-xs ${isActive ? "bg-[var(--saffron)] text-white hover:bg-[var(--saffron)]/90" : ""}`}
                      onClick={() => toggleConstraint(c)}
                    >
                      {c}
                    </Button>
                  );
                })}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleAdd} className="w-full bg-[var(--saffron)] text-white hover:bg-[var(--saffron)]/90">
              <Plus className="mr-2 h-4 w-4" /> Add to Roster
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Action to proceed */}
      <div className="pt-6 border-t mt-8 flex justify-end">
        <Button 
          disabled={members.length === 0} 
          onClick={() => router.push("/board")}
          size="lg" 
          className="w-full md:w-auto h-12 text-md transition-transform active:scale-95"
        >
          {members.length === 0 ? "Add a member to continue" : "Generate Meal Plan"}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
