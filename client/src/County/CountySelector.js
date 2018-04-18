import React from 'react';
import { fetchCounties, chooseCounty } from '../Actions/countiesActions';
import { Dropdown } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


function mapStateToProps(state) {
  return { data: state.counties };
}

class CountySelector extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchCounties());
    this.props.dispatch(chooseCounty('Adams')); // To get around event not firing until first selection.
                                                    // Need to actually get first county in array.
  }

  handleCountyChosen = (e, value) => {
    this.props.dispatch(chooseCounty(value.value));
  };

  render() {
    const options = this.props.data.counties.map(county => ({ key: county.name, value: county.name, text: county.name }));

    return (
      <div>
        <Dropdown fluid selection search placeholder='Select a county' onChange={this.handleCountyChosen} options={options} />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(CountySelector));
