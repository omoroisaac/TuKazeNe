// Add to your imports
import ReviewScreen from './src/screens/ReviewScreen';

// Add to your Stack.Navigator
<Stack.Screen 
  name="Review" 
  component={ReviewScreen}
  options={{ 
    title: 'Leave Review',
    headerStyle: {
      backgroundColor: '#16a34a',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }}
/>