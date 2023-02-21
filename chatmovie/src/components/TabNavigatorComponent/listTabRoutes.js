import { AntDesign } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

export const createListRoutes = (auth) => {

    const routes = {
        user: [
            {
                name: 'Home',
                Icon: ({ color }) => <AntDesign name="home" size={24} color={color} />
            },
            {
                name: 'Add',
                Icon: ({ color }) => <Octicons name="people" size={24} color={color} />
            },
            {
                name: 'Authenticate',
                Icon: ({ color }) => <Ionicons name="person-circle-outline" size={24} color={color} />
            },
            {
                name: 'Messages',
                Icon: ({ color }) => <Feather name="message-square" size={24} color={color} />
            }
        ],
        no_user: [
            {
                name: 'Home',
                Icon: ({ color }) => <AntDesign name="home" size={24} color={color} />
            },
            {
                name: 'Authenticate',
                Icon: ({ color }) => <Ionicons name="person-circle-outline" size={24} color={color} />
            }
        ]
    }

    return routes[auth ? 'user' : 'no_user'];
}
