import React from 'react';

import CollectionOverview from '../../components/collection-overview/collection-overview.component';
import {Route} from 'react-router-dom';
import CollectionPage from '../collectionpage/collectionpage.component';

import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils';

import { updateCollectionMap } from '../../redux/shop/shop.actions';
import {connect} from 'react-redux';

class ShopPage extends React.Component {
    
    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const {updateCollectionMap} = this.props;
        const collectionRef = firestore.collection('collections');

        this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
            const collectionMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollectionMap(collectionMap)
            
        });
    }
 
    render() {
        const {match} = this.props;
        return (
            <div>
                <Route exact path={`${match.path}`} component={CollectionOverview} />
                <Route  path={`${match.path}/:collectionId`} component={CollectionPage} />
            </div>
        );
    }      
}

const mapDispatchToProps = dispatch => ({
    updateCollectionMap: collectionMap => dispatch(updateCollectionMap(collectionMap))
}) 


export default connect(null,mapDispatchToProps)(ShopPage);