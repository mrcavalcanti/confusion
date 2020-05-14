import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import { ABOUTUS } from '../shared/aboutus';

class AboutUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
          aboutus: ABOUTUS,
        };
    }
	
    static navigationOptions = {
        title: 'About Us'
    };

    render() {
		const aboutUs = this.state.aboutus;
		
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