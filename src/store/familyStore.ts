import { create } from "zustand";
import { persist } from "zustand/middleware";

export type MedicalConstraint = 
  | "Diabetes" 
  | "Lactose Intolerance" 
  | "Gluten Free" 
  | "Low Sodium" 
  | "Nut Allergy" 
  | "None";

export type CaloricGoal = "Maintenance" | "Deficit" | "Surplus";

export interface FamilyMember {
  id: string;
  name: string;
  age: number | "";
  gender: string;
  medicalConstraints: MedicalConstraint[];
  caloricGoal: CaloricGoal;
}

interface FamilyState {
  members: FamilyMember[];
  addMember: (member: Omit<FamilyMember, "id">) => void;
  updateMember: (id: string, member: Partial<FamilyMember>) => void;
  removeMember: (id: string) => void;
  clearMembers: () => void;
}

export const useFamilyStore = create<FamilyState>()(
  persist(
    (set) => ({
      members: [],
      addMember: (member) => 
        set((state) => {
          if (state.members.length >= 5) return state; // Max 5 members
          return {
            members: [
              ...state.members,
              { ...member, id: crypto.randomUUID() }
            ]
          };
        }),
      updateMember: (id, updatedMember) =>
        set((state) => ({
          members: state.members.map((m) =>
            m.id === id ? { ...m, ...updatedMember } : m
          ),
        })),
      removeMember: (id) =>
        set((state) => ({
          members: state.members.filter((m) => m.id !== id),
        })),
      clearMembers: () => set({ members: [] }),
    }),
    {
      name: "sanjha-family-storage", // localStorage key
    }
  )
);
