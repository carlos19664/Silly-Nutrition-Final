"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface VitalsData {
  age_years?: number
  height?: {
    cm: number
    unit: "cm" | "ft_in"
    ft?: number
    in?: number
  }
  weight_current?: {
    kg: number
    unit: "kg" | "st_lb"
    st?: number
    lb?: number
  }
  weight_target?: {
    kg: number
    unit: "kg" | "st_lb"
    st?: number
    lb?: number
  }
  unit_prefs?: {
    height: "cm" | "ft_in"
    weight: "kg" | "st_lb"
  }
}

interface VitalsSelectorProps {
  value: VitalsData
  onChange: (value: VitalsData) => void
}

export function VitalsSelector({ value, onChange }: VitalsSelectorProps) {
  const [age, setAge] = useState<string>(value.age_years?.toString() || "")
  const [heightUnit, setHeightUnit] = useState<"cm" | "ft_in">(value.height?.unit || "cm")
  const [heightCm, setHeightCm] = useState<string>(value.height?.cm?.toString() || "")
  const [heightFt, setHeightFt] = useState<string>(value.height?.ft?.toString() || "")
  const [heightIn, setHeightIn] = useState<string>(value.height?.in?.toString() || "")

  const [weightUnit, setWeightUnit] = useState<"kg" | "st_lb">(value.weight_current?.unit || "kg")
  const [weightKg, setWeightKg] = useState<string>(value.weight_current?.kg?.toString() || "")
  const [weightSt, setWeightSt] = useState<string>(value.weight_current?.st?.toString() || "")
  const [weightLb, setWeightLb] = useState<string>(value.weight_current?.lb?.toString() || "")

  const [targetWeightUnit, setTargetWeightUnit] = useState<"kg" | "st_lb">(value.weight_target?.unit || weightUnit)
  const [targetWeightKg, setTargetWeightKg] = useState<string>(value.weight_target?.kg?.toString() || "")
  const [targetWeightSt, setTargetWeightSt] = useState<string>(value.weight_target?.st?.toString() || "")
  const [targetWeightLb, setTargetWeightLb] = useState<string>(value.weight_target?.lb?.toString() || "")

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Conversion functions
  const cmToFtIn = (cm: number): { ft: number; in: number } => {
    const totalInches = cm / 2.54
    const ft = Math.floor(totalInches / 12)
    const inches = Math.round(totalInches % 12)
    return { ft, in: inches }
  }

  const ftInToCm = (ft: number, inches: number): number => {
    return Math.round((ft * 12 + inches) * 2.54 * 10) / 10
  }

  const kgToStLb = (kg: number): { st: number; lb: number } => {
    const totalLbs = kg / 0.45359237
    const st = Math.floor(totalLbs / 14)
    const lb = Math.round(totalLbs % 14)
    return { st, lb }
  }

  const stLbToKg = (st: number, lb: number): number => {
    return Math.round((st * 14 + lb) * 0.45359237 * 10) / 10
  }

  // Handle height unit toggle
  const handleHeightUnitToggle = () => {
    if (heightUnit === "cm" && heightCm) {
      const cm = Number.parseFloat(heightCm)
      const { ft, in: inches } = cmToFtIn(cm)
      setHeightFt(ft.toString())
      setHeightIn(inches.toString())
      setHeightUnit("ft_in")
    } else if (heightUnit === "ft_in" && heightFt && heightIn) {
      const cm = ftInToCm(Number.parseFloat(heightFt), Number.parseFloat(heightIn))
      setHeightCm(cm.toString())
      setHeightUnit("cm")
    } else {
      setHeightUnit(heightUnit === "cm" ? "ft_in" : "cm")
    }
  }

  // Handle weight unit toggle
  const handleWeightUnitToggle = () => {
    if (weightUnit === "kg" && weightKg) {
      const kg = Number.parseFloat(weightKg)
      const { st, lb } = kgToStLb(kg)
      setWeightSt(st.toString())
      setWeightLb(lb.toString())
      setWeightUnit("st_lb")
    } else if (weightUnit === "st_lb" && weightSt && weightLb) {
      const kg = stLbToKg(Number.parseFloat(weightSt), Number.parseFloat(weightLb))
      setWeightKg(kg.toString())
      setWeightUnit("kg")
    } else {
      setWeightUnit(weightUnit === "kg" ? "st_lb" : "kg")
    }
  }

  // Handle target weight unit toggle
  const handleTargetWeightUnitToggle = () => {
    if (targetWeightUnit === "kg" && targetWeightKg) {
      const kg = Number.parseFloat(targetWeightKg)
      const { st, lb } = kgToStLb(kg)
      setTargetWeightSt(st.toString())
      setTargetWeightLb(lb.toString())
      setTargetWeightUnit("st_lb")
    } else if (targetWeightUnit === "st_lb" && targetWeightSt && targetWeightLb) {
      const kg = stLbToKg(Number.parseFloat(targetWeightSt), Number.parseFloat(targetWeightLb))
      setTargetWeightKg(kg.toString())
      setTargetWeightUnit("kg")
    } else {
      setTargetWeightUnit(targetWeightUnit === "kg" ? "st_lb" : "kg")
    }
  }

  // Validation
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}

    // Age validation
    const ageNum = Number.parseFloat(age)
    if (!age || isNaN(ageNum)) {
      newErrors.age = "Age is required"
    } else if (ageNum < 13 || ageNum > 100) {
      newErrors.age = "Enter a realistic age (13-100)"
    }

    // Height validation
    if (heightUnit === "cm") {
      const cm = Number.parseFloat(heightCm)
      if (!heightCm || isNaN(cm)) {
        newErrors.height = "Height is required"
      } else if (cm < 100 || cm > 250) {
        newErrors.height = "Enter a realistic height"
      }
    } else {
      const ft = Number.parseFloat(heightFt)
      const inches = Number.parseFloat(heightIn)
      if (!heightFt || !heightIn || isNaN(ft) || isNaN(inches)) {
        newErrors.height = "Height is required"
      } else if (ft < 3 || ft > 8 || inches < 0 || inches >= 12) {
        newErrors.height = "Enter a realistic height"
      }
    }

    // Current weight validation
    if (weightUnit === "kg") {
      const kg = Number.parseFloat(weightKg)
      if (!weightKg || isNaN(kg)) {
        newErrors.weight = "Current weight is required"
      } else if (kg < 30 || kg > 300) {
        newErrors.weight = "Enter a realistic weight"
      }
    } else {
      const st = Number.parseFloat(weightSt)
      const lb = Number.parseFloat(weightLb)
      if (!weightSt || !weightLb || isNaN(st) || isNaN(lb)) {
        newErrors.weight = "Current weight is required"
      } else if (st < 4 || st > 47 || lb < 0 || lb >= 14) {
        newErrors.weight = "Enter a realistic weight"
      }
    }

    // Target weight validation (optional)
    if (targetWeightKg || targetWeightSt || targetWeightLb) {
      if (targetWeightUnit === "kg") {
        const kg = Number.parseFloat(targetWeightKg)
        if (targetWeightKg && (isNaN(kg) || kg < 30 || kg > 300)) {
          newErrors.targetWeight = "Enter a realistic target weight"
        }
      } else {
        const st = Number.parseFloat(targetWeightSt)
        const lb = Number.parseFloat(targetWeightLb)
        if ((targetWeightSt || targetWeightLb) && (isNaN(st) || isNaN(lb) || st < 4 || st > 47 || lb < 0 || lb >= 14)) {
          newErrors.targetWeight = "Enter a realistic target weight"
        }
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Update parent component whenever values change
  useEffect(() => {
    const isValid = validate()

    if (isValid) {
      const vitalsData: VitalsData = {
        age_years: Number.parseFloat(age),
        height: {
          cm:
            heightUnit === "cm"
              ? Number.parseFloat(heightCm)
              : ftInToCm(Number.parseFloat(heightFt), Number.parseFloat(heightIn)),
          unit: heightUnit,
          ...(heightUnit === "ft_in" && { ft: Number.parseFloat(heightFt), in: Number.parseFloat(heightIn) }),
        },
        weight_current: {
          kg:
            weightUnit === "kg"
              ? Number.parseFloat(weightKg)
              : stLbToKg(Number.parseFloat(weightSt), Number.parseFloat(weightLb)),
          unit: weightUnit,
          ...(weightUnit === "st_lb" && { st: Number.parseFloat(weightSt), lb: Number.parseFloat(weightLb) }),
        },
        unit_prefs: {
          height: heightUnit,
          weight: weightUnit,
        },
      }

      // Add target weight if provided
      if (targetWeightKg || targetWeightSt || targetWeightLb) {
        vitalsData.weight_target = {
          kg:
            targetWeightUnit === "kg"
              ? Number.parseFloat(targetWeightKg)
              : stLbToKg(Number.parseFloat(targetWeightSt), Number.parseFloat(targetWeightLb)),
          unit: targetWeightUnit,
          ...(targetWeightUnit === "st_lb" && {
            st: Number.parseFloat(targetWeightSt),
            lb: Number.parseFloat(targetWeightLb),
          }),
        }
      }

      onChange(vitalsData)
    }
  }, [
    age,
    heightUnit,
    heightCm,
    heightFt,
    heightIn,
    weightUnit,
    weightKg,
    weightSt,
    weightLb,
    targetWeightUnit,
    targetWeightKg,
    targetWeightSt,
    targetWeightLb,
  ])

  return (
    <div className="space-y-6">
      {/* Age */}
      <div>
        <label htmlFor="age" className="block text-sm font-semibold text-gray-900 mb-2">
          Age (years) <span className="text-orange-500">*</span>
        </label>
        <Input
          id="age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="e.g., 34"
          min={13}
          max={100}
          className="text-base"
        />
        {errors.age && <p className="text-sm text-red-600 mt-1">{errors.age}</p>}
      </div>

      {/* Height */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="height" className="block text-sm font-semibold text-gray-900">
            Height <span className="text-orange-500">*</span>
          </label>
          <div className="flex gap-1" role="tablist" aria-label="Height unit">
            <Button
              type="button"
              size="sm"
              variant={heightUnit === "cm" ? "default" : "outline"}
              onClick={handleHeightUnitToggle}
              aria-pressed={heightUnit === "cm"}
              className={heightUnit === "cm" ? "bg-orange-500 hover:bg-orange-600" : ""}
            >
              CM
            </Button>
            <Button
              type="button"
              size="sm"
              variant={heightUnit === "ft_in" ? "default" : "outline"}
              onClick={handleHeightUnitToggle}
              aria-pressed={heightUnit === "ft_in"}
              className={heightUnit === "ft_in" ? "bg-orange-500 hover:bg-orange-600" : ""}
            >
              FT + IN
            </Button>
          </div>
        </div>
        {heightUnit === "cm" ? (
          <Input
            id="height"
            type="number"
            value={heightCm}
            onChange={(e) => setHeightCm(e.target.value)}
            placeholder="e.g., 178"
            className="text-base"
          />
        ) : (
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              value={heightFt}
              onChange={(e) => setHeightFt(e.target.value)}
              placeholder="ft"
              min={3}
              max={8}
              className="text-base"
            />
            <Input
              type="number"
              value={heightIn}
              onChange={(e) => setHeightIn(e.target.value)}
              placeholder="in"
              min={0}
              max={11}
              className="text-base"
            />
          </div>
        )}
        {errors.height && <p className="text-sm text-red-600 mt-1">{errors.height}</p>}
      </div>

      {/* Current Weight */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="weight" className="block text-sm font-semibold text-gray-900">
            Current Weight <span className="text-orange-500">*</span>
          </label>
          <div className="flex gap-1" role="tablist" aria-label="Weight unit">
            <Button
              type="button"
              size="sm"
              variant={weightUnit === "kg" ? "default" : "outline"}
              onClick={handleWeightUnitToggle}
              aria-pressed={weightUnit === "kg"}
              className={weightUnit === "kg" ? "bg-orange-500 hover:bg-orange-600" : ""}
            >
              KG
            </Button>
            <Button
              type="button"
              size="sm"
              variant={weightUnit === "st_lb" ? "default" : "outline"}
              onClick={handleWeightUnitToggle}
              aria-pressed={weightUnit === "st_lb"}
              className={weightUnit === "st_lb" ? "bg-orange-500 hover:bg-orange-600" : ""}
            >
              ST + LB
            </Button>
          </div>
        </div>
        {weightUnit === "kg" ? (
          <Input
            id="weight"
            type="number"
            value={weightKg}
            onChange={(e) => setWeightKg(e.target.value)}
            placeholder="e.g., 85.3"
            step="0.1"
            className="text-base"
          />
        ) : (
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              value={weightSt}
              onChange={(e) => setWeightSt(e.target.value)}
              placeholder="st"
              min={4}
              max={47}
              className="text-base"
            />
            <Input
              type="number"
              value={weightLb}
              onChange={(e) => setWeightLb(e.target.value)}
              placeholder="lb"
              min={0}
              max={13}
              className="text-base"
            />
          </div>
        )}
        {errors.weight && <p className="text-sm text-red-600 mt-1">{errors.weight}</p>}
      </div>

      {/* Target Weight (Optional) */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="targetWeight" className="block text-sm font-semibold text-gray-900">
            Target Weight <span className="text-gray-500 text-xs">(optional)</span>
          </label>
          <div className="flex gap-1" role="tablist" aria-label="Target weight unit">
            <Button
              type="button"
              size="sm"
              variant={targetWeightUnit === "kg" ? "default" : "outline"}
              onClick={handleTargetWeightUnitToggle}
              aria-pressed={targetWeightUnit === "kg"}
              className={targetWeightUnit === "kg" ? "bg-orange-500 hover:bg-orange-600" : ""}
            >
              KG
            </Button>
            <Button
              type="button"
              size="sm"
              variant={targetWeightUnit === "st_lb" ? "default" : "outline"}
              onClick={handleTargetWeightUnitToggle}
              aria-pressed={targetWeightUnit === "st_lb"}
              className={targetWeightUnit === "st_lb" ? "bg-orange-500 hover:bg-orange-600" : ""}
            >
              ST + LB
            </Button>
          </div>
        </div>
        {targetWeightUnit === "kg" ? (
          <Input
            id="targetWeight"
            type="number"
            value={targetWeightKg}
            onChange={(e) => setTargetWeightKg(e.target.value)}
            placeholder="e.g., 78.0"
            step="0.1"
            className="text-base"
          />
        ) : (
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              value={targetWeightSt}
              onChange={(e) => setTargetWeightSt(e.target.value)}
              placeholder="st"
              min={4}
              max={47}
              className="text-base"
            />
            <Input
              type="number"
              value={targetWeightLb}
              onChange={(e) => setTargetWeightLb(e.target.value)}
              placeholder="lb"
              min={0}
              max={13}
              className="text-base"
            />
          </div>
        )}
        {errors.targetWeight && <p className="text-sm text-red-600 mt-1">{errors.targetWeight}</p>}
      </div>
    </div>
  )
}
