import { Button, Typography } from '@hedtech/react-design-system/core';
import { withStyles } from '@hedtech/react-design-system/core/styles';
import { spacingSmall } from '@hedtech/react-design-system/core/styles/tokens';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { intlShape } from 'react-intl';
import { withIntl } from './ReactIntlProviderWrapper';

const styles = () => ({
    count: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    reset: {
        marginTop: spacingSmall
    }
});

const cacheKey = 'local-cache-card:view-count';

const CacheCard = (props) => {
    const { classes, cache: { getItem, storeItem, removeItem }, intl } = props;

    const [ viewedCount, setViewedCount ] = useState(0);

    const resetCount = () => {
        setViewedCount(0);
        removeItem({ key: cacheKey });
    };

    useEffect(() => {
        const fetchCount = async () => {
            const { data } = await getItem({ key: cacheKey });
            const count = data ? data.count + 1 : 1;
            storeItem({ key: cacheKey, data: { count } });
            setViewedCount(count);
        };

        // load and increment view count
        fetchCount();
    }, []);

    return (
        <div className={classes.count}>
            <Typography className={classes.label} variant="body2" color="textPrimary">
                {intl.formatMessage({ id: 'CacheCard-viewCount' }, { viewedCount })}
            </Typography>
            <Button className={classes.reset} onClick={resetCount}>
                {intl.formatMessage({ id: 'CacheCard-reset' })}
            </Button>
        </div>
    );
};

CacheCard.propTypes = {
    classes: PropTypes.object.isRequired,
    cache: PropTypes.object.isRequired,
    intl: intlShape.isRequired
};

export default withIntl(withStyles(styles)(CacheCard));
