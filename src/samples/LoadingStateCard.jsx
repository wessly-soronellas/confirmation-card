import { Button, Typography } from '@hedtech/react-design-system/core';
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

class LoadingStateCard extends React.Component {
    render() {
        const { classes, cardControl: { setLoadingStatus }, intl } = this.props;

        return (
            <div className={classes.card}>
                <Typography className={classes.label} variant="body2" color="textPrimary">
                    {intl.formatMessage({ id: 'LoadingStateCard-label' })}
                </Typography>
                <LoadingButton setLoadingStatus={setLoadingStatus} intl={intl} />
            </div>
        );
    }
}

LoadingStateCard.propTypes = {
    cardControl: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    intl: intlShape.isRequired
};

export default withIntl(withStyles(styles)(LoadingStateCard));

function LoadingButton(props) {
    const { intl } = props;
    const [ status, setStatus ] = useState('loaded');

    function reload() {
        setStatus('loading');
        const { setLoadingStatus } = props;

        if (setLoadingStatus != undefined) {
            setLoadingStatus(true);
        }
        setTimeout(reset, 10000);
    }

    function reset() {
        setStatus('loaded');
        const { setLoadingStatus } = props;

        if (setLoadingStatus != undefined) {
            setLoadingStatus(false);
        }
    }

    return (
        <div>
            <Typography variant="body2" color="textPrimary">
                {intl.formatMessage({ id: 'LoadingStateCard-status' }, { status })}
            </Typography>
            <Button aria-label={'Set loading status'} onClick={reload}>
                {intl.formatMessage({ id: 'LoadingStateCard-reload' })}
            </Button>
        </div>
    );
}

LoadingButton.propTypes = {
    setLoadingStatus: PropTypes.func.isRequired,
    intl: intlShape.isRequired
};
