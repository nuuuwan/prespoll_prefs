import { Component } from "react";
import { Election } from "../../nonview/core";
import { ElectionView } from "../molecules";
export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      election: Election.randomPresPoll2024(11),
    };
  }

  async componentDidMount() {
    this.setState({});
  }

  render() {
    const { election } = this.state;
    return <ElectionView election={election} />;
  }
}
