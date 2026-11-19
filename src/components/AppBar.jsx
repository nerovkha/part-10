import { ScrollView, StyleSheet, Pressable, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { useApolloClient } from '@apollo/client/react';

import theme from '../theme';
import Text from './Text';
import { AUTHORIZED_USER } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.appBarBackground,
    flexDirection: 'row',
    paddingBottom: 4,
  },
  scrollView: {
    flexDirection: 'row',
  },
  tab: {
    padding: 16,
  },
});

// react-router-native v6's <Link> ignores a `component` prop and wraps its
// children in a TouchableHighlight, which needs exactly one element child —
// plain text crashes with "React.Children.only expected to receive a single
// React element child". So tabs navigate themselves instead.
const AppBarTab = ({ children, to, onPress, ...props }) => {
  const navigate = useNavigate();
  const handlePress = to ? () => navigate(to) : onPress;

  return (
    <Pressable style={styles.tab} onPress={handlePress} {...props}>
      <Text fontWeight="bold" color="white">
        {children}
      </Text>
    </Pressable>
  );
};

const AppBar = () => {
  const { data } = useQuery(AUTHORIZED_USER, {
    variables: { includeReviews: false },
  });
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const navigate = useNavigate();

  const username = data?.me?.username;

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    navigate('/');
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollView}>
        <AppBarTab to="/">Repositories</AppBarTab>
        {username && <AppBarTab to="/myreviews">My reviews</AppBarTab>}
        {username ? (
          <AppBarTab onPress={signOut}>Sign out</AppBarTab>
        ) : (
          <AppBarTab to="/signin">Sign in</AppBarTab>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
