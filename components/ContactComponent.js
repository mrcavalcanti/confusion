import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import { CONTACTUS } from '../shared/contactus';

class ContactUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
          contactus: CONTACTUS,
        };
    }
	
    static navigationOptions = {
        title: 'Contact Us'
    };

    render() {
		const contactUs = this.state.contactus;
		
        return(
            <View>
                <Card>
                     <Text style={styles.titleText}>
                        Contact Information
					</Text>
					<Divider style={{ backgroundColor: 'silver' }} />
                     <Text style={styles.baseText}>
                        {contactUs[0].address}
					</Text>
                     <Text style={styles.baseText}>
                        {contactUs[0].location}
					</Text>
                     <Text style={styles.baseText}>
                        {contactUs[0].city}
					</Text>
                     <Text style={styles.baseText}>
                        {contactUs[0].phone}
					</Text>
                     <Text style={styles.baseText}>
                        {contactUs[0].phoneFax}
					</Text>
                     <Text style={styles.baseText}>
                        {contactUs[0].email}
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
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
	textAlign: "center",
	margin: 10
  }
});

export default ContactUs;