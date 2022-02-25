import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Header, Body } from './app/screens/components';
import React, { useState } from 'react';




export default function App() {
  const [page, setpage] = useState('home');

  return (
    <>

      < Header pageindex={() => {
        if (page === 'home') {
          setpage('info');
        } else {
          setpage('home');
        }
      }} />


      <Body page={page} />

    </>

  );
}







