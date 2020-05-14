import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet, FlatList } from 'react-native';
import { Card, Divider, ListItem } from 'react-native-elements';
import { ABOUTUS } from '../shared/aboutus';
import { LEADERS } from '../shared/leaders';

class AboutUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
          aboutus: ABOUTUS,
		  leaders: LEADERS
        };
    }
	
    static navigationOptions = {
        title: 'About Us'
    };

    render() {
		const aboutUs = this.state.aboutus;
		
		const renderMenuItem = ({item, index}) => {

			return (
					<ListItem
						key={index}
						title={item.name}
						subtitle={item.description}
						hideChevron={true}
						leftAvatar={{ source: require('./images/alberto.png')}}
					  />
			);
		};
		
        return(
            <View>
                <Card
                    featuredTitle={
						<Text>{aboutUs[0].title}</Text>
					}
					>
                     <Text style={styles.titleText}>
                        {aboutUs[0].title}
					</Text>
					<Divider style={{ backgroundColor: 'silver' }} />
                     <Text style={styles.baseTextStrong}>
                        {aboutUs[0].history}
					</Text>
                </Card>
				
                <Card
                    featuredTitle={
						<Text>Corporate Leadership</Text>
					}
					>
                     <Text style={styles.titleText}>
                        Corporate Leadership
					</Text>
					<Divider style={{ backgroundColor: 'silver' }} />
					<FlatList 
						data={this.state.leaders}
						renderItem={renderMenuItem}
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

export default AboutUs;