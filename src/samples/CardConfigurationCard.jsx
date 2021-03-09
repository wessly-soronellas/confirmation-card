import { Typography } from '@hedtech/react-design-system/core';
import { withStyles } from '@hedtech/react-design-system/core/styles';
import { spacingSmall } from '@hedtech/react-design-system/core/styles/tokens';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

const styles = () => ({
    card: {
        margin: spacingSmall
    }
});

const CardConfigurationCard = (props) => {
    const { classes, cardInfo: { configuration } } = props;

    const configurationItems = [];

    if (configuration) {
        Object.keys(configuration).forEach((key) => {
            configurationItems.push({
                key,
                value: configuration[key]
            });
        });
    }

    return (
        <div className={classes.card}>
            {configurationItems.map((item) => (
                <Fragment key={item.key}>
                    <Typography variant="body2" color="textPrimary">
                        {item.key}:
                    </Typography>
                    <Typography variant="body2" color="textPrimary">
                        {item.value}
                    </Typography>
                </Fragment>
            ))}
        </div>
    );
};

CardConfigurationCard.propTypes = {
    classes: PropTypes.object.isRequired,
    cardInfo: PropTypes.object.isRequired
};

export default withStyles(styles)(CardConfigurationCard);
