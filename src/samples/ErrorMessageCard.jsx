import { Button, TextField, Typography } from '@hedtech/react-design-system/core';
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

class ErrorMessageCard extends React.Component {
    render() {
        const { classes, cardControl: { setErrorMessage }, intl } = this.props;

        return (
            <div className={classes.card}>
                <Typography className={classes.label} variant="body2" color="textPrimary">
                    {intl.formatMessage({ id: 'ErrorMessageCard-description' })}
                </Typography>
                <ErrorMessage setErrorMessage={setErrorMessage} intl={intl} />
            </div>
        );
    }
}

ErrorMessageCard.propTypes = {
    cardControl: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    intl: intlShape.isRequired
};

export default withIntl(withStyles(styles)(ErrorMessageCard));

function ErrorMessage(props) {
    const [ headerMessage, setHeaderMessage ] = useState('Access denied');
    const [ textMessage, setTextMessage ] = useState('You are not permitted to see this data');
    const [ iconName, setIconName ] = useState('privacy');
    const [ iconColor, setIconColor ] = useState('red');

    const { intl } = props;

    const handleChange = (event) => {
        const { name, value } = event.target;

        switch (name) {
            case 'headerMessage':
                setHeaderMessage(value);
                break;
            case 'textMessage':
                setTextMessage(value);
                break;
            case 'iconName':
                setIconName(value);
                break;
            case 'iconColor':
                setIconColor(value);
                break;
            default:
                break;
        }
    };

    function submitValues() {
        const { setErrorMessage } = props;

        if (setErrorMessage != undefined) {
            setErrorMessage({ headerMessage, textMessage, iconName, iconColor });
        }
    }

    return (
        <div>
            <TextField
                name="headerMessage"
                inputProps={{ 'aria-label': intl.formatMessage({ id: 'ErrorMessageCard-headerMessage' }) }}
                id={'headerMessage'}
                label={intl.formatMessage({ id: 'ErrorMessageCard-headerMessage' })}
                onChange={handleChange}
                fullWidth={true}
                value={headerMessage}
            />
            <TextField
                name="textMessage"
                inputProps={{ 'aria-label': intl.formatMessage({ id: 'ErrorMessageCard-textMessage' }) }}
                id={'textMessage'}
                label={intl.formatMessage({ id: 'ErrorMessageCard-textMessage' })}
                onChange={handleChange}
                fullWidth={true}
                value={textMessage}
            />
            <TextField
                name="iconName"
                inputProps={{ 'aria-label': intl.formatMessage({ id: 'ErrorMessageCard-iconName' }) }}
                id={'iconName'}
                label={intl.formatMessage({ id: 'ErrorMessageCard-iconName' })}
                onChange={handleChange}
                fullWidth={true}
                value={iconName}
            />
            <TextField
                name="iconColor"
                inputProps={{ 'aria-label': intl.formatMessage({ id: 'ErrorMessageCard-iconColor' }) }}
                id={'iconColor'}
                label={intl.formatMessage({ id: 'ErrorMessageCard-iconColor' })}
                onChange={handleChange}
                fullWidth={true}
                value={iconColor}
            />
            <Button
                aria-label={intl.formatMessage({ id: 'ErrorMessageCard-buttonAria' })}
                onClick={submitValues}
                color="secondary"
            >
                {intl.formatMessage({ id: 'ErrorMessageCard-submit' })}
            </Button>
        </div>
    );
}

ErrorMessage.propTypes = {
    setErrorMessage: PropTypes.func.isRequired,
    intl: intlShape.isRequired
};
