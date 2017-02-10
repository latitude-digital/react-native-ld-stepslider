## react-native-ld-stepslider


### Preview
![alt text](http://i.giphy.com/l3q2H4z2oggPjv4By.gif)

### Installation
```bash
$ npm install latitude-digital/react-native-ld-stepslider --save
```

### Usage
```jsx
import React, { Component } from 'react'
import { View, Text } from 'react-native'

import StepSlider from 'react-native-ld-stepslider'

const options1 = [
  "Not At All Familiar",
  "Somewhat Familiar",
  "Very Familiar",
]

const options2 =[1,2,3,4,5,6,7,8,9,10]

export default class StepSliderExample extends Component {

  constructor(){
    super()
    this.state = {
      familiar: '',
      impression: '',
    }
  }

  render(){
    return (
      <View style={{padding: 20}}>

        <Text style={{fontWeight: '600', margin: 20}}>
          How familiar are you with this brand's current models?
        </Text>

        <StepSlider
          label="Brand A"
          options={options1}
          onSlidingComplete={(value) => this.setState({familiar: value})}
          start="center"
          tailColor="#5BA20A"
        />

        <Text style={{fontWeight: '600', margin: 20}}>
          What is your overall opinion or impression of the following brand?
        </Text>

        <StepSlider
          label="Brand A"
          options={options2}
          onSlidingComplete={(value) => this.setState({impression: value})}
          minText="Poor"
          maxText="Excellent"
        />

      </View>
    )
  }
}
```

### Props

| Name | Type | Optional | Default | Description |
| --- | --- | --- | --- | --- |
| options | array of strings or numbers | No |  | An array of values for the user to select from. |
| onSelectItem | function | No |  | Callback that returns the selected value. |
| label | string | Yes |  | Title of the slider. |
| sliderWidth | number | Yes | `600` | The width of the slider. |
| start | "center" or "left" | Yes | "left" | Location where thumb and trail begins. |
| minText | string | Yes | | If using slider as ranker, text that appears on the left of slider. |
| maxText | string | Yes | | If using slider as ranker, text that appears on the right of slider. |
| textColor | string | Yes | '#9B9B9B' | Color of all text in StepSlider. |
| tailColor | string | Yes | '#47708E' | Color of tail behind thumb on track. |
