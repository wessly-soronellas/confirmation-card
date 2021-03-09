import { Dropdown, DropdownItem, List, ListItem, ListItemText, Typography } from '@hedtech/react-design-system/core';
import { withStyles } from '@hedtech/react-design-system/core/styles';
import { spacingSmall, spacingXSmall } from '@hedtech/react-design-system/core/styles/tokens';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import { intlShape } from 'react-intl';
import { withIntl } from '../ReactIntlProviderWrapper';

const styles = () => ({
    card: {
        margin: spacingXSmall
    },
    list: {
        margin: spacingXSmall
    },
    formControl: {
        margin: `0 ${spacingSmall}`
    },
    text: {
        margin: `0 ${spacingSmall}`
    }
});

const cacheKey = 'graphql-card:sites';

const GraphQLQueryCard = (props) => {
    const {
        classes,
        cardControl: { setLoadingStatus },
        data: { getEthosQuery },
        intl,
        cache: { getItem, storeItem },
        mockSites,
        mockBuildings
    } = props;

    const [ buildings, setBuildings ] = useState();
    const [ sites, setSites ] = useState();
    const [ selectedSite, setSelectedSite ] = useState();

    useEffect(() => {
        (async () => {
            setLoadingStatus(true);

            if (mockSites) {
                // load mock data
                const sites = mockSites.data.sites.edges.map(site => site.node );
                setSites(() => sites);
                setLoadingStatus(false);
            } else {
                const {data: cachedData, expired: cachedDataExpired=true} = await getItem({key: cacheKey});
                if (cachedData) {
                    setLoadingStatus(false);
                    setSites(() => cachedData);
                }
                if (cachedDataExpired || cachedData === undefined) {
                    try {
                        const sitesData = await getEthosQuery({ queryId: 'list-sites' });
                        const { data: { sites: { edges: siteEdges } = [] } = {} } = sitesData;
                        const sites = siteEdges.map( edge => edge.node );
                        setSites(() => sites);
                        storeItem({ key: cacheKey, data: sites });
                        setLoadingStatus(false);
                    } catch (error) {
                        console.log('ethosQuery failed', error);
                    }
                }
            }
        })();
    }, []);

    useEffect(
        () => {
            (async () => {
                if (selectedSite) {
                    // load the buildings
                    let buildings = [];

                    if (mockBuildings) {
                        // load mock data
                        buildings = mockBuildings.data.buildings.edges.map(b => b.node).filter((b) => b.site6.id == selectedSite);
                    } else {
                        try {
                            const buildingsData = await getEthosQuery({ queryId: 'list-buildings', properties: {'siteId' : selectedSite } });
                            const { data: { buildings: { edges: buildingEdges } = [] } = {} } = buildingsData;
                            buildings = buildingEdges.map( edge => edge.node );
                        } catch (error) {
                            console.log('ethosQuery failed', error);
                        }
                    }
                    setBuildings(() => buildings);
                }
            })();
        },
        [ selectedSite ]
    );

    const handleChange = (event) => {
        setSelectedSite(event.target.value);
    };

    return (
        <Fragment>
            {sites && (
                <div className={classes.card}>
                    <Dropdown
                        className={classes.dropdown}
                        FormControlProps={{ classes: { root: classes.formControl } }}
                        id="graphql-query-card-sites-dropdown"
                        label={intl.formatMessage({ id: 'GraphQLQueryCard-sites' })}
                        onChange={handleChange}
                        value={selectedSite}
                        fullWidth
                    >
                        {sites.map((site) => {
                            return <DropdownItem key={site.id} label={site.title} value={site.id} />;
                        })}
                    </Dropdown>
                    {buildings && (
                        <List className={classes.list}>
                            {buildings.map((building, index) => (
                                <ListItem key={`building-${index}`}>
                                    <ListItemText primary={building.title} />
                                </ListItem>
                            ))}
                        </List>
                    )}
                    {buildings &&
                    buildings.length == 0 &&
                    selectedSite && (
                        <Typography className={classes.text} variant="body1">
                            {intl.formatMessage({ id: 'GraphQLQueryCard-noBuildings' })}
                        </Typography>
                    )}
                </div>
            )}
            {sites &&
            !selectedSite && (
                <Typography className={classes.text} variant="body1">
                    {intl.formatMessage({ id: 'GraphQLQueryCard-noSelectedSite' })}
                </Typography>
            )}
        </Fragment>
    );
};

GraphQLQueryCard.propTypes = {
    cardControl: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    cache: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
    mockSites: PropTypes.object,
    mockBuildings: PropTypes.object
};
export default withIntl(withStyles(styles)(GraphQLQueryCard));