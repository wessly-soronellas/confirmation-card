import { Button, Typography } from '@hedtech/react-design-system/core';
import { withStyles } from '@hedtech/react-design-system/core/styles';
import { spacingSmall } from '@hedtech/react-design-system/core/styles/tokens';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { intlShape } from 'react-intl';
import { withIntl } from './ReactIntlProviderWrapper';

const styles = {
    button: {
        margin: spacingSmall
    },
    text: {
        margin: spacingSmall
    }
};

const DrilldownCard = (props) => {
    const { classes, cardControl: { drilldown, resetDrilldown } = {}, intl } = props;

    const [ count, setCount ] = useState(0);
    const [ inDetail, setInDetail ] = useState(false);

    useEffect(
        () => {
            if (count > 0) {
                setInDetail(true);
            }
        },
        [ count ]
    );

    useEffect(
        () => {
            if (inDetail) {
                drilldown(() => {
                    setInDetail(false);
                }, intl.formatMessage({ id: 'DrilldownCard-clicks' }, { count }));
            }
        },
        [ inDetail ]
    );

    return inDetail ? (
        <div>
            <Typography className={classes.text}>
                {intl.formatMessage({ id: 'DrilldownCard-message' }, { count })}
            </Typography>
            <Button
                className={classes.button}
                onClick={() => {
                    resetDrilldown();
                    setInDetail(false);
                }}
            >
                {intl.formatMessage({ id: 'DrilldownCard-goBack' })}
            </Button>
        </div>
    ) : (
        <Button
            className={classes.button}
            onClick={() => {
                setCount(count + 1);
            }}
        >
            {intl.formatMessage({ id: 'DrilldownCard-clickMe' })}
        </Button>
    );
};

DrilldownCard.propTypes = {
    classes: PropTypes.object.isRequired,
    cardControl: PropTypes.object.isRequired,
    intl: intlShape.isRequired
};

export default withIntl(withStyles(styles)(DrilldownCard));
