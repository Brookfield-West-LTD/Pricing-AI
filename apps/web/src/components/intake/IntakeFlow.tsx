'use client'
import * as React from 'react'
import { useIntakeStore } from '@/lib/store'
import { IntakeShell } from './IntakeShell'
import { StepWho } from './steps/StepWho'
import { StepLocation } from './steps/StepLocation'
import { StepCurrentPower } from './steps/StepCurrentPower'
import { StepDirection } from './steps/StepDirection'
import { StepLoad } from './steps/StepLoad'
import { StepBillConfirm } from './steps/StepBillConfirm'
import { StepSummary } from './steps/StepSummary'

const STEPS = [
  StepWho,
  StepLocation,
  StepCurrentPower,
  StepDirection,
  StepLoad,
  StepBillConfirm,
  StepSummary,
]

export function IntakeFlow() {
  const { step } = useIntakeStore()
  const clampedStep = Math.min(Math.max(step, 0), STEPS.length - 1)
  const StepComponent = STEPS[clampedStep] ?? StepWho

  return (
    <IntakeShell step={clampedStep}>
      <StepComponent />
    </IntakeShell>
  )
}
