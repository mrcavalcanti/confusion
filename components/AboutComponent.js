import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet, FlatList } from 'react-native';
import { Card, Divider, ListItem } from 'react-native-elements';
import { ABOUTUS } from '../shared/aboutus';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
	return {
		leaders: state.leaders
	}
}
  
class AboutUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
          aboutus: ABOUTUS
        };
    }
	
    static navigationOptions = {
        title: 'About Us'
    };

    render() {
		const aboutUs = this.state.aboutus;
		
		const renderLeader = ({item, index}) => {

			return (
					<ListItem
						key={index}
						title={item.name}
						subtitle={item.description}
						hideChevron={true}
						leftAvatar={{source: {uri: baseUrl + item.image}}}
					  />
			);
		};
		
        return(
            <View>
                <Card>
                     <Text style={styles.titleText}>
                        {aboutUs[0].title}
					</Text>
					<Divider style={{ backgroundColor: 'silver' }} />
                     <Text style={styles.baseTextStrong}>
                        {aboutUs[0].history}
					</Text>
                </Card>
				
                <Card>
                     <Text style={styles.titleText}>
                        Corporate Leadership
					</Text>
					<Divider style={{ backgroundColor: 'silver' }} />
					<FlatList 
						data={this.props.leaders.leaders}
						renderItem={renderLeader}
						keyExtractor={item => item.id.toString()}
						/>
				</Card>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  baseText: {
    margin: 10
  },
  baseTextStrong: {
    margin: 10,
	fontWeight: "bold"
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
	textAlign: "center",
	margin: 10
  }
});

export default connect(mapStateToProps)(AboutUs);