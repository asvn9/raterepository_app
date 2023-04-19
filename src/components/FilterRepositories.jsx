import * as React from 'react';
import { Searchbar } from 'react-native-paper';
import { gql, useQuery } from '@apollo/client';
import {GET_REPOSITORIESS} from '../grqphql/queries'


const filterRepositories = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const { loading, data } = useQuery(GET_REPOSITORIESS, {
    variables: { searchKeyword: searchQuery },
  });

  const onChangeSearch = query => setSearchQuery(query);
  console.log(data)
  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  );
};

export default filterRepositories