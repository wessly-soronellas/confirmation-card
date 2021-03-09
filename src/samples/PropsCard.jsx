import { withStyles } from '@hedtech/react-design-system/core/styles';
import { spacingSmall } from '@hedtech/react-design-system/core/styles/tokens';
import PropTypes from 'prop-types';
import React from 'react';
import { withIntl } from './ReactIntlProviderWrapper';

const styles = () => ({
    card: {
        marginLeft: spacingSmall,
        marginRight: spacingSmall
    }
});

const PropsCard = (props) => {
    const { classes } = props;

    return <pre className={classes.card}>{JSON.stringify(props, undefined, 2)}</pre>;
};

PropsCard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withIntl(withStyles(styles)(PropsCard));
