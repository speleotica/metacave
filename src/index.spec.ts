/* eslint-env mocha */

import { describe, it } from 'mocha'
import { expect } from 'chai'

import { formatLength, formatAngle } from './index'
import { Length, Unitize, Angle } from '@speleotica/unitized'

describe('formatLength', () => {
  it('with same as default unit', () => {
    expect(formatLength(Unitize.feet(2), Length.feet)).to.equal('2')
  })
  it('with feet and defaultUnit = m', () => {
    expect(formatLength(Unitize.feet(2), Length.meters)).to.deep.equal([
      '2',
      'ft',
    ])
  })
  it('with centimeters and defaultUnit = m', () => {
    expect(formatLength(Unitize.centimeters(85), Length.meters)).to.deep.equal([
      '0.85',
      'm',
    ])
  })
  it('with inches > 12', () => {
    expect(formatLength(Unitize.inches(15), Length.feet)).to.deep.equal([
      '1',
      'ft',
      '3',
      'in',
    ])
  })
  it('with inches < 12', () => {
    expect(formatLength(Unitize.inches(9), Length.feet)).to.deep.equal([
      '9',
      'in',
    ])
  })
  it('with inches = 12n', () => {
    expect(formatLength(Unitize.inches(24), Length.feet)).to.deep.equal([
      '2',
      'ft',
    ])
  })
})

describe('formatAngle', () => {
  it('with same as default unit', () => {
    expect(formatAngle(Unitize.degrees(2), Angle.degrees)).to.equal('2')
  })
  it('with degrees and defaultUnit = gradians', () => {
    expect(formatAngle(Unitize.degrees(2), Angle.gradians)).to.deep.equal([
      '2',
      'deg',
    ])
  })
  it('with radians and defaultUnit = degrees', () => {
    expect(formatAngle(Unitize.radians(Math.PI), Angle.degrees)).to.deep.equal([
      '180',
      'deg',
    ])
  })
})
