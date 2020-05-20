import React, { Component } from 'react';
import { Text, ScrollView, View, FlatList, Modal, Button, StyleSheet, Alert, PanResponder } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';

import { postFavorite, postComment } from '../redux/ActionCreators';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
	  favorites: state.favorites
    }
  }
  
const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
	postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
})

function RenderDish(props) {
	const dish = props.dish;
	
	handleViewRef = ref => this.view = ref;
	
    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
        if ( dx < -200 )
            return true;
        else
            return false;
    }
	
    const recognizeDragComment = ({ moveX, moveY, dx, dy }) => {
        if ( dx > 200 )
            return true;
        else
            return false;
    }

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderGrant: () => {
			this.view.rubberBand(1000).then(endState => console.log(endState.finished ? 'finished' : 'cancelled'));
		},
        onPanResponderEnd: (e, gestureState) => {
            console.log("pan responder end", gestureState);
            if (recognizeDrag(gestureState))
			{
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + dish.name + ' to favorite?',
                    [
						{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
						{text: 'OK', onPress: () => {props.favorite ? console.log('Already favorite') : props.onPress()}},
                    ],
                    { cancelable: false }
                );
			}
			if (recognizeDragComment(gestureState))
			{
				props.onPressHandleReservation();
			}
            return true;
        }
    })
	
	if (dish != null) {
		return(
			<Animatable.View animation="fadeInDown" duration={2000} delay={1000} ref={this.handleViewRef} {...panResponder.panHandlers}>
				<Card
				featuredTitle={dish.name}
				image={{uri: baseUrl + dish.image}}>
					<Text style={{margin: 10}}>
						{dish.description}
					</Text>
					<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center',	justifyContent: 'center' }}>
						<Icon raised reverse name={ props.favorite ? 'heart' : 'heart-o'} type='font-awesome' color='#f50' onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()} />
						<Icon raised reverse name={ 'pencil' } type='font-awesome' color='#512DA8' onPress={() => props.onPressHandleReservation()}	/>
					</View>
				</Card>
			</Animatable.View>
		);
	}
	else {
		return(<View></View>);
	}
};

function RenderComments(props) {
    const comments = props.comments;
            
    const renderCommentItem = ({item, index}) => {
        return (
            <View key={index} style={{margin: 10, flex: 1, flexDirection: 'column',	alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
				<Rating imageSize={20} readonly startingValue={item.rating} style={{ padding: 10 }} />
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };
    
    return (
		<Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
			<Card title='Comments' >
			<FlatList data={comments} renderItem={renderCommentItem} keyExtractor={item => item.id.toString()} />
			</Card>
		</Animatable.View>
    );
}

class Dishdetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
			favorites: [],
			rating: 5,
			author: '',
			comment: '',
			showModal: false
        };
    }

    static navigationOptions = {
        title: 'Dish Details'
    };
	
    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }
	
	addComment(dishId) {
		this.props.postComment(dishId, this.state.rating, this.state.author, this.state.comment);
	}
	
	toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    handleComment() {
        console.log(JSON.stringify(this.state));
        this.toggleModal();
    }
	
    resetForm() {
        this.setState({
			rating: 5,
			author: '',
			comment: '',
            showModal: false
        });
    }
	
    render() {
        const dishId = this.props.navigation.getParam('dishId','');
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)} 
					onPressHandleReservation={ () => this.handleComment() }
                    />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
                <Modal animationType = {"slide"} transparent = {false}
                    visible = {this.state.showModal}
                    onDismiss = {() => this.toggleModal() }
                    onRequestClose = {() => this.toggleModal() }>
                    <View style = {styles.modal}>
						<Rating
							showRating
							fractions={0}
							ratingCount={5}
							minValue={1}
							startingValue={5}
							onFinishRating={value => this.setState({ rating: value })}
							style={{ paddingVertical: 10 }}
						/>
						<Input
							placeholder='Author'
							leftIcon={{ type: 'font-awesome', name: 'user-o' }}
							onChangeText={value => this.setState({ author: value })}
						/>
						<Input
							placeholder='Comment'
							leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
							onChangeText={value => this.setState({ comment: value })}
						/>
                        
                        <Button style = {{padding: 10}}
                            onPress = {() =>{this.addComment(dishId); this.toggleModal(); this.resetForm();}}
                            color="#512DA8"
                            title="Submit" 
                            />
						<Separator />
                        <Button style = {{padding: 10, marginVertical: 8}}
                            onPress = {() =>{this.toggleModal(); this.resetForm();}}
                            color="gray"
                            title="Cancel" 
                            />
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

function Separator() {
	return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
    modal: {
       justifyContent: 'center',
       margin: 20
    },
	separator: {
		marginVertical: 8,
		borderBottomColor: '#737373',
		borderBottomWidth: StyleSheet.hairlineWidth
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);