import { Switch, Typography } from '@hedtech/react-design-system/core';
import { withStyles } from '@hedtech/react-design-system/core/styles';
import { spacingSmall } from '@hedtech/react-design-system/core/styles/tokens';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { intlShape } from 'react-intl';
import { withIntl } from './ReactIntlProviderWrapper';

const styles = () => ({
    card: {
        padding: spacingSmall
    }
});

class PreventRemoveCard extends React.Component {
    render() {
        const { classes, cardControl: { setPreventRemove, setPreventRemoveMessage }, intl } = this.props;

        return (
            <div className={classes.card}>
                <Typography className={classes.label} variant="body2" color="textPrimary">
                    {intl.formatMessage({ id: 'PreventRemoveCard-switchLabel' })}
                </Typography>
                <ToggleFooter setPreventRemove={setPreventRemove} setPreventRemoveMessage={setPreventRemoveMessage} />
            </div>
        );
    }
}

PreventRemoveCard.propTypes = {
    cardControl: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    intl: intlShape.isRequired
};

export default withIntl(withStyles(styles)(PreventRemoveCard));

function ToggleFooter(props) {
    const [ toggle, setToggle ] = useState(false);

    function toggleSwitch() {
        setToggle(!toggle);
        const { setPreventRemove, setPreventRemoveMessage } = props;

        if (setPreventRemove != undefined) {
            setPreventRemove(!toggle);
            setPreventRemoveMessage(`You can't remove me!`);
        }
    }

    return (
        <Switch
            inputProps={{ 'aria-label': 'Toggle prevent remove' }}
            id={`switch-prevent-remove`}
            checked={toggle}
            onChange={toggleSwitch}
        />
    );
}

ToggleFooter.propTypes = {
    setPreventRemove: PropTypes.func.isRequired,
    setPreventRemoveMessage: PropTypes.func.isRequired
};
