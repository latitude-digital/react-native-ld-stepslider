import React, { Component } from 'react'
import proxyquire from 'proxyquire'
import { shallow, mount, render } from 'enzyme'
import { expect, assert } from 'chai'
import { stub } from 'sinon'
import {
  View,
  Text,
  Dimensions,
  TouchableHighlight,
  Slider
} from 'react-native'

import StepSlider from '../index.js'

const getOrDefault = (props, key, def) => {
  return key in props ? props[key] : def
}

const buildComponent = (props) => {
  return (
    <StepSlider
      options={getOrDefault(props, 'options', ['opt1', 'opt2'])}
      label={getOrDefault(props, 'label', 'Brand A')}
      minText={getOrDefault(props, 'minText', 'Poor')}
      maxText={getOrDefault(props, 'maxText', 'Excellent')}
      start={getOrDefault(props, 'start', 'center')}
      textColor={getOrDefault(props, 'textColor', '#9B9B9B')}
      tailColor={getOrDefault(props, 'tailColor', '#47708E')}
      value={getOrDefault(props, 'value', 3)}
      sliderWidth={getOrDefault(props, 'sliderWidth', 50)}
      onValueChange={getOrDefault(props, 'onValueChange', () => {})}
    />
  )
}

const hasText = (element, txt) =>
  element.props().children === txt
const filterByText = (elements, txt) =>
  elements.filterWhere(e => hasText(e, txt))

describe('<StepSlider/>', () => {
  it('Text component with label presents only as first element', () => {
    const label = 'Black Label'
    const wrapper = shallow(buildComponent({ label }))
    const textElements = wrapper.find('Text')
    //first Text component has text "Black label"
    expect(textElements.at(0).props().children).to.be.equal(label)
    //there is only one Text component with this text
    expect(filterByText(textElements, label)).to.have.lengthOf(1)
    //Overall we have 5 Text components (label + min + max + two options)
    expect(textElements).to.have.lengthOf(5)
  })

  it('Text component with label missing', () => {
    const wrapper = shallow(buildComponent({ label: null }))
    expect(wrapper.find('Text')).to.have.lengthOf(4) // min, max + two options
  })

  it('Text components with minText and maxText present only as 2nd and 3rd', () => {
    const minText = 'gnome'
    const maxText = 'gulliver'
    const wrapper = shallow(buildComponent({ minText, maxText }))
    const textElements = wrapper.find('Text')
    expect(textElements.at(1).props().children).to.be.equal(minText)
    expect(textElements.at(2).props().children).to.be.equal(maxText)
    expect(filterByText(textElements, minText)).to.have.lengthOf(1)
    expect(filterByText(textElements, maxText)).to.have.lengthOf(1)
    expect(textElements).to.have.lengthOf(5) // label + min + max + two options
  })

  it('Text component with minText missing', () => {
    const wrapper = shallow(buildComponent({ minText: null }))
    expect(wrapper.find('Text')).to.have.lengthOf(3) // label + two options
  })

  it('Text component with maxText missing', () => {
    const wrapper = shallow(buildComponent({ maxText: null }))
    expect(wrapper.find('Text')).to.have.lengthOf(3) // label + two options
  })

  it('TouchableHighlight component with 3 options', () => {
    const options = ['o1', 'o2', 'o3']
    let clickValue = null
    const onValueChange = i => clickValue = i
    const wrapper = shallow(buildComponent({ options, onValueChange }))
    const touchableElements = wrapper.find('TouchableHighlight')
    expect(touchableElements).to.have.lengthOf(options.length)
    options.forEach((option, i) => {
      const textElement = touchableElements.at(i).childAt(0)
      expect(textElement.name()).to.be.equal('Text')
      expect(textElement.props().children).to.be.equal(option)
      //simulate click on option
      touchableElements.at(i).prop('onPress')()
      //check that value is updated with option clicked
      expect(clickValue).to.be.equal(i)
    })
  })

  it('Empty options - should be no TouchableHighlight components', () => {
    const wrapper = shallow(buildComponent({ options: [] }))
    expect(wrapper.find('TouchableHighlight')).to.be.lengthOf(0)
  })

  //width: sliderWidth ? sliderWidth/optionsLength : 600/optionsLength,
  it('Verify styles when sliderWidth is missing', () => {
    const wrapper = shallow(buildComponent({sliderWidth: null}))
    const viewElements = wrapper.find('View')
    // TODO: Verify width in styles of pretty much all views and TouchableHighlight
    // Currently it gives negative values which is I guess wrong?!
    //console.log('View4:',viewElements.at(4).props().style)
    //console.log('View5:',viewElements.at(5).props().style)
  })

  it('sliderWidth - should be what is passed', () => {
    const sliderWidth = 32
    const calculatedSliderWidth = 16
    const trackWidth = 6
    const trackTailWidth = 30

    const wrapper = shallow(buildComponent({ sliderWidth }))
    const viewElements = wrapper.find('View')
    // Most outer View contains 3 Views where the last View contains 2 nested
    // Views. Total = 1 + 3 + 2 = 6.
    expect(viewElements).to.be.lengthOf(6)
    expect(viewElements.at(3).props().style).to.have.property('width', calculatedSliderWidth)
    expect(viewElements.at(4).props().style).to.have.property('width', trackWidth)
    expect(viewElements.at(5).props().style).to.have.property('width', trackTailWidth)
  })

  it('Track styles', () => {
    const wrapper = shallow(buildComponent({}))
    //Find all styles of track
    const trackStyles = wrapper.find('View').at(3).childAt(0).props().style
    expect(trackStyles).to.have.property('width', 15)
    expect(trackStyles).to.have.property('backgroundColor', '#b3b3b3')
    expect(trackStyles).to.have.property('height', 5)
    expect(trackStyles).to.have.property('marginLeft', 5)
    expect(trackStyles).to.have.property('alignSelf', 'stretch')
    expect(trackStyles).to.have.property('position', 'absolute')
    expect(trackStyles).to.have.property('marginTop', 17)
  })

  it('TrackTail styles with start in center', () => {
    const wrapper = shallow(buildComponent({}))
    //Find all styles of trackTail
    const trackTailStyles = wrapper.find('View').at(3).childAt(1).props().style
    expect(trackTailStyles).to.have.property('backgroundColor', '#47708E')
    expect(trackTailStyles).to.have.property('height', 5)
    expect(trackTailStyles).to.have.property('alignSelf', 'stretch')
    expect(trackTailStyles).to.have.property('position', 'absolute')
    expect(trackTailStyles).to.have.property('marginTop', 17)
    expect(trackTailStyles).to.have.property('marginLeft', 12.5)
  })

  it('TrackTail styles with start in left and black tailColor', () => {
    const wrapper = shallow(buildComponent({ start: 'left', tailColor: 'black' }))
    //Find all styles of trackTail
    const trackStyles = wrapper.find('View').at(3).childAt(1).props().style
    expect(trackStyles).to.have.property('backgroundColor', 'black')
    expect(trackStyles).to.have.property('height', 5)
    expect(trackStyles).to.have.property('alignSelf', 'stretch')
    expect(trackStyles).to.have.property('position', 'absolute')
    expect(trackStyles).to.have.property('marginTop', 17)
    expect(trackStyles).to.have.property('marginLeft', 5)
  })
})
