import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { supabase } from '../supabase'

type Attendance = {
  id: number
  employee_name: string
  arrival_time: string | null
  departure_time: string | null
  created_at: string
}

export default function EmployeeDetails() {

  const navigation = useNavigation()

  const [data, setData] = useState<Attendance[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {

    const { data, error } = await supabase
      .from('pointage')
      .select('*')
      .order('created_at', { ascending: false })

    console.log(data, error)

    setData(data ?? [])
    setLoading(false)
  }

  // TABLE ROW
  const renderItem = ({ item }: { item: Attendance }) => {

    let delay = '-'

    if (item.arrival_time) {

      // Arrival time
      const arrivalDate = new Date(item.arrival_time)

      // Hours and minutes
      const hours = arrivalDate.getHours()
      const minutes = arrivalDate.getMinutes()

      // Convert to minutes
      const totalMinutes = (hours * 60) + minutes

      // Work starts at 08:00
      const workStart = 8 * 60

      // Calculate delay
      const lateMinutes = totalMinutes - workStart

      if (lateMinutes > 0) {
        delay = `${lateMinutes} min`
      } else {
        delay = 'On Time'
      }
    }

    return (
      <View style={styles.row}>

        {/* EMPLOYEE NAME */}
        <Text style={styles.cellName}>
          {item.employee_name}
        </Text>

        {/* ARRIVAL */}
        <Text style={styles.cell}>
          {item.arrival_time
            ? new Date(item.arrival_time).toLocaleTimeString()
            : '-'}
        </Text>

        {/* DEPARTURE */}
        <Text style={styles.cell}>
          {item.departure_time
            ? new Date(item.departure_time).toLocaleTimeString()
            : '-'}
        </Text>

        {/* DELAY */}
        <Text
          style={[
            styles.cell,
            {
              color: delay === 'On Time' ? 'green' : 'red',
              fontWeight: 'bold'
            }
          ]}
        >
          {delay}
        </Text>

      </View>
    )
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>

      {/* TOP SECTION */}
      <View style={styles.top}>

        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
        />

        <Text style={styles.title}>
          Employee Details
        </Text>

      </View>

      {/* TABLE */}
      <View style={styles.tableWrapper}>

        {/* TABLE HEADER */}
        <View style={styles.tableHeader}>

          <Text style={styles.headerText}>
            Employee
          </Text>

          <Text style={styles.headerText}>
            Arrival
          </Text>

          <Text style={styles.headerText}>
            Departure
          </Text>

          <Text style={styles.headerText}>
            Delay
          </Text>

        </View>

        {/* TABLE DATA */}
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />

      </View>

      {/* BACK BUTTON */}
      {/* BACK TEXT */}
<TouchableOpacity
  onPress={() => navigation.goBack()}
>
  <Text style={styles.backText}>
    Back
  </Text>
</TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20
  },

  // TOP SECTION
  top: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20
  },

  logo: {
    width: 200,
    height: 60,
    marginBottom: 10,
    marginTop: 20,
    resizeMode: 'contain'
  },

  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000'
  },

  // TABLE
  tableWrapper: {
    flex: 1,
    marginTop: 10
  },

  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#368ac3',
    padding: 10,
    borderRadius: 8
  },

  headerText: {
    flex: 1,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12
  },

  row: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    marginTop: 5,
    borderRadius: 8,
    elevation: 2
  },

  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12
  },

  cellName: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12
  },

  // BACK BUTTON

  backText: {
  textAlign: 'center',
  fontSize: 16,
  color: '#3b82f6',
  fontWeight: 'bold',
  marginBottom: 20,
  marginTop: 10
},

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }

})