import { UnitizedNumber, Length, Angle, Unit } from '@speleotica/unitized'

function formatLengthUnit(unit: Unit<Length>): string | null {
  switch (unit) {
    case Length.inches:
      return 'in'
    case Length.feet:
      return 'ft'
    case Length.yards:
      return 'yd'
    case Length.miles:
      return 'mi'
    case Length.meters:
      return 'm'
    case Length.kilometers:
      return 'km'
  }
  return null
}

function formatAngleUnit(unit: Unit<Angle>): string | null {
  switch (unit) {
    case Angle.degrees:
      return 'deg'
    case Angle.gradians:
      return 'grad'
    case Angle.milsNATO:
      return 'mil'
    case Angle.percentGrade:
      return '%'
  }
  return null
}

export function formatLength(
  measurement: UnitizedNumber<Length>,
  defaultUnit: Unit<Length>
): string | Array<string> {
  if (measurement.unit === defaultUnit) {
    return String(measurement.get(defaultUnit))
  }
  if (measurement.unit === Length.inches) {
    const value = measurement.get(Length.inches)
    const result = []
    const feet = Math.floor(value / 12)
    if (feet) result.push(String(feet), 'ft')
    const inches = Math.floor(value % 12)
    if (inches) result.push(String(inches), 'in')
    return result
  }
  let formattedUnit = formatLengthUnit(measurement.unit)
  if (formattedUnit)
    return [String(measurement.get(measurement.unit)), formattedUnit]
  formattedUnit = formatLengthUnit(defaultUnit)
  if (formattedUnit)
    return [String(measurement.get(defaultUnit)), formattedUnit]
  return [String(measurement.get(Length.meters)), 'm']
}

export function formatAngle(
  measurement: UnitizedNumber<Angle>,
  defaultUnit: Unit<Angle>
): string | Array<string> {
  if (measurement.unit === defaultUnit) {
    return String(measurement.get(defaultUnit))
  }
  let formattedUnit = formatAngleUnit(measurement.unit)
  if (formattedUnit)
    return [String(measurement.get(measurement.unit)), formattedUnit]
  formattedUnit = formatAngleUnit(defaultUnit)
  if (formattedUnit)
    return [String(measurement.get(defaultUnit)), formattedUnit]
  return [String(measurement.get(Angle.degrees)), 'deg']
}
