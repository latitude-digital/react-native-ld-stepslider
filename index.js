import React, { Component, PropTypes } from 'react'
import {
  View,
  Text,
  Dimensions,
  TouchableHighlight,
  Slider,
} from 'react-native'

export default class StepSlider extends Component {

  static PropTypes = {
    onSlidingComplete: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    label: PropTypes.string,
    minText: PropTypes.string,
    maxText: PropTypes.string,
    start: PropTypes.string,
    textColor: PropTypes.string,
    tailColor: PropTypes.string,
    sliderWidth: PropTypes.number,
  }

  static defaultProps = {
    textColor: '#9B9B9B',
    tailColor: '#47708E',
    start: 'left',
    sliderWidth: 600,
  }

  constructor(props){
    super(props)
    this.state = {
      value: props.start == 'center' ? (props.options.length-1)/2 : 0
    }
  }

  renderOptions = () => {

    const {
      options,
      sliderWidth,
      onSlidingComplete,
      textColor,
    } = this.props

    var optionsArray = []

    options.map((option, i)=>{
      optionsArray.push(
        <TouchableHighlight
          style={styles.option(sliderWidth, options.length)}
          key={i}
          underlayColor='white'
          onPress={() => {
            this.setState({value: i})
            onSlidingComplete(i)
          }}
        >
          <Text style={styles.optionText(textColor)}>{option}</Text>
        </TouchableHighlight>
      )
    })

    return optionsArray

  }

  render(){

    const {
      options,
      label,
      minText,
      maxText,
      start,
      textColor,
      tailColor,
    } = this.props

    const stepCount = options.length - 1
    const step = 1/(stepCount)
    const sliderWidth = this.props.sliderWidth-((this.props.sliderWidth/2)*step)
    const fromCenterTailWidth = ((sliderWidth)/(stepCount))*(Math.abs((stepCount)/2 - this.state.value))
    const fromLeftTailWidth = (sliderWidth)/(stepCount) * this.state.value
    const tailWidth = start == 'center' ? fromCenterTailWidth : fromLeftTailWidth
    const tailMarginLeft = start == 'center' ? (this.state.value < (stepCount)/2 ? sliderWidth/2 - fromCenterTailWidth + 5 : sliderWidth/2) : 5

    return (
      <View style={styles.view}>

        {label ? <Text style={styles.sliderLabel(textColor)}>{label}</Text> : null}

        {minText && maxText ?
          <View style={styles.minAndMaxView(sliderWidth)}>
            <Text style={{color: textColor}}>{minText}</Text>
            <Text style={{color: textColor}}>{maxText}</Text>
          </View>
        : null}

        <View style={styles.optionsView( minText && maxText )}>
          {this.renderOptions(this.props.sliderWidth)}
        </View>

        <View style={{width: sliderWidth}}>

          <View style={styles.track(sliderWidth)} />
          <View style={styles.trackTail(tailWidth, tailMarginLeft, tailColor)} />

          <Slider {...this.props}
            value={this.state.value}
            step={1}
            onValueChange={(value) => this.setState({value: value})}
            maximumValue={stepCount}
            minimumTrackTintColor={'transparent'}
            maximumTrackTintColor={'transparent'}
          />

        </View>
      </View>
    )
  }
}

const styles={
  view: {
    alignItems: 'center',
    marginBottom: 30
  },
  option: (sliderWidth, optionsLength) => {
    return {
      width: sliderWidth ? sliderWidth/optionsLength : 600/optionsLength,
    }
  },
  optionText: (textColor) => {
    return {
      textAlign: 'center',
      color: textColor,
    }
  },
  optionsView: (minAndMax) => {
    return {
      flexDirection: 'row',
      marginTop: minAndMax ? 0 : 20,
    }
  },
  minAndMaxView: (sliderWidth) => {
    return {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: sliderWidth,
    }
  },
  track: (sliderWidth) => {
    return {
      backgroundColor: '#b3b3b3',
      height: 5,
      marginLeft: 5,
      alignSelf: 'stretch',
      position: 'absolute',
      width: sliderWidth-10,
      marginTop: 17,
    }
  },
  trackTail: (tailWidth, tailMarginLeft, tailColor) => {
    return {
      backgroundColor: tailColor,
      height: 5,
      alignSelf: 'stretch',
      position: 'absolute',
      width: tailWidth-10,
      marginTop: 17,
      marginLeft: tailMarginLeft,
    }
  },
  sliderLabel: (textColor) => {
    return {
      fontSize: 24,
      color: textColor,
      fontWeight: '600',
    }
  }
}
