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
  Slider,
} from 'react-native'
import StepSlider from '../index.js'

// class StepSlider extends Component {
//   render() {
//     return <View><Text>OK</Text></View>
//   }
// }

describe('<StepSlider/>', () => {
  it('XXX', () => {
    const label = 'Brand A'
    const wrapper = shallow(
      <StepSlider
        options={[1,2,3,4,5,6,7,8,9,10]}
        label='Brand A'
        minText='Poor'
        maxText='Excellent'
        start='center'
        textColor='#9B9B9B'
        tailColor='#47708E'
        value={3}
        sliderWidth={5}
        onValueChange={() => {}}
      />
    )
    const textComp = wrapper.find('Text')
    expect(textComp.nodes[0].props.children).to.be.equal(label)

    // const sliderComp = wrapper.find('Slider')
    // console.log(sliderComp.nodes[0].props)

  })
})
