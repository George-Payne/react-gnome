// @flow

import React from 'react';
import { Grid, Label, Window, Button } from '../src';

type Props = {}
type State = {
    count: number,
}

class App extends React.Component<Props, State> {
    state: State = {
        count: 1,
    }

    _upCount = () => {
        this.setState({
            count: this.state.count + 1,
        })
    }

    render() {
        const { count } = this.state;

        return (
            <Window
                title={'Some title here'}
            >
                <Grid rowSpacing={count}>
                    <Label>{`Some text here ${count}`}</Label>
                    { count > 2 &&
                        <Label>{'You sure have a high count!'}</Label>
                    }
                    <Button onPress={this._upCount}>
                        {'Up my Count'}
                    </Button>
                </Grid>
            </Window>
        );
    }
}

export default App;
