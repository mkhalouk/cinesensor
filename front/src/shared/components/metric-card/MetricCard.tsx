
import { Component } from 'react';
import './MetricCard.css'
import { faS, faTemperatureHalf, faWind, faVolumeUp, faDroplet } from '@fortawesome/free-solid-svg-icons';
import { IconProp, library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BehaviorSubject } from 'rxjs';
import { isJsonString } from '../../utils/JsonReader';

library.add(faS, faTemperatureHalf)
library.add(faS, faWind)
library.add(faS, faVolumeUp)
library.add(faS, faDroplet)


interface MetricCardProps {
  identifier: string;
  options: any;
  subject: BehaviorSubject<any>;
  icon: string
}


interface MetricCardState {
  currentReading: string;
  lastReading: string;
}

class MetricCard extends Component<MetricCardProps, MetricCardState> {

  constructor(props: MetricCardProps) {
    super(props);
    this.state = {currentReading : '_', lastReading : '_'};
    this.update = this.update.bind(this);
  }


  componentDidMount() {
    this.props.subject.subscribe(this.update);

  }

  update(_message : any) : void {
    this.setState((prevState) => {
      return {
        currentReading : isJsonString(_message.toString()) ? JSON.parse(_message.toString())?.sensor[this.props.identifier] : undefined,
        lastReading : prevState.currentReading
      }
    })
  }

  render() {
    return (
      <>
        <div className="metric-card">
          <FontAwesomeIcon size="2x" icon={["fas",this.props.icon] as IconProp} spin spinReverse/>
          <h1>{this.state.currentReading}</h1>
          <h3>Last Reading :  {this.state.lastReading}</h3>
        </div>
      </>
    )
  }
}

export default MetricCard;
