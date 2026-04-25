import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { EnergyDirection, CurrentSource, WhoType, Priority, Appliance } from '@pricing-ai/shared'

export interface IntakeData {
  who: WhoType | null
  location: string
  lat: number | null
  lng: number | null
  currentSource: CurrentSource | null
  generatorKva: number | null
  energyDirection: EnergyDirection | null
  appliances: Appliance[]
  billUploaded: boolean
  extractedKwh: number | null
}

interface PriaState {
  isOpen: boolean
  isVoiceOpen: boolean
  anchorId: string | null
}

interface IntakeStore {
  // Plan
  planId: string | null
  shareToken: string | null
  step: number
  data: IntakeData
  priority: Priority
  pria: PriaState

  // Actions
  setPlanId: (id: string, token: string) => void
  setStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  updateData: (patch: Partial<IntakeData>) => void
  setPriority: (p: Priority) => void
  addAppliance: (a: Appliance) => void
  removeAppliance: (id: string) => void
  updateApplianceHours: (id: string, hours: number) => void
  openPria: (anchorId?: string) => void
  closePria: () => void
  toggleVoice: () => void
  reset: () => void
}

const initialData: IntakeData = {
  who: null,
  location: '',
  lat: null,
  lng: null,
  currentSource: null,
  generatorKva: null,
  energyDirection: null,
  appliances: [],
  billUploaded: false,
  extractedKwh: null,
}

export const useIntakeStore = create<IntakeStore>()(
  persist(
    (set) => ({
      planId: null,
      shareToken: null,
      step: 0,
      data: initialData,
      priority: 'cost',
      pria: { isOpen: false, isVoiceOpen: false, anchorId: null },

      setPlanId: (id, token) => set({ planId: id, shareToken: token }),
      setStep: (step) => set({ step }),
      nextStep: () => set((s) => ({ step: s.step + 1 })),
      prevStep: () => set((s) => ({ step: Math.max(0, s.step - 1) })),
      updateData: (patch) => set((s) => ({ data: { ...s.data, ...patch } })),
      setPriority: (priority) => set({ priority }),
      addAppliance: (a) =>
        set((s) => ({ data: { ...s.data, appliances: [...s.data.appliances, a] } })),
      removeAppliance: (id) =>
        set((s) => ({
          data: { ...s.data, appliances: s.data.appliances.filter((a) => a.id !== id) },
        })),
      updateApplianceHours: (id, hours) =>
        set((s) => ({
          data: {
            ...s.data,
            appliances: s.data.appliances.map((a) =>
              a.id === id ? { ...a, hoursPerDay: Math.max(0.5, hours) } : a,
            ),
          },
        })),
      openPria: (anchorId) =>
        set({ pria: { isOpen: true, isVoiceOpen: false, anchorId: anchorId ?? null } }),
      closePria: () => set({ pria: { isOpen: false, isVoiceOpen: false, anchorId: null } }),
      toggleVoice: () =>
        set((s) => ({
          pria: { ...s.pria, isVoiceOpen: !s.pria.isVoiceOpen, isOpen: false },
        })),
      reset: () => set({ planId: null, shareToken: null, step: 0, data: initialData }),
    }),
    { name: 'pricing-ai-intake', version: 1 },
  ),
)
