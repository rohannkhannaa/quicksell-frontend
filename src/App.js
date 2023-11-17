// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import KanbanBoard from './components/KanbanBoard';

const API_URL = 'https://api.quicksell.co/v1/internal/frontend-assignment';

function App() {
  const [tickets, setTickets] = useState([]);
  const [groupedTickets, setGroupedTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState('status'); // Default grouping by status
  const [sortBy, setSortBy] = useState('priority'); // Default sorting by priority

  useEffect(() => {
    fetchData();
  }, []); // Fetch data on component mount

  useEffect(() => {
    // Whenever the groupBy state changes, re-group tickets and users
    groupTickets(tickets);
    // groupUsers(users);
  }, [groupBy, tickets, users]);

  useEffect(() => {
    // Whenever the sortBy state changes, re-group tickets and users
    sortTickets();
    // groupUsers(users);
  }, [sortBy, tickets, users]);

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      const { tickets: ticketData, users: userData } = response.data;

      // Convert tickets array to an object
      const ticketsObject = ticketData.reduce((result, tick) => {
        result[tick.id] = tick;
        return result;
      }, {});
      const usersObject = userData.reduce((result, userr) => {
        result[userr.id] = userr;
        return result;
      }, {});

      setUsers(usersObject);
      setTickets(ticketsObject);
      groupTickets(ticketsObject); // Group tickets initially
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const groupTickets = (ticketsToGroup) => {
    if (!ticketsToGroup || typeof ticketsToGroup !== 'object') {
      console.error('Invalid data format. Expected an object.');
      return;
    }

    const groupedTicketsArray = Object.values(ticketsToGroup).reduce((result, ticket) => {
      const groupKey = ticket[groupBy];
      const existingGroup = result.find((group) => group.groupKey === groupKey);

      if (existingGroup) {
        existingGroup.tickets.push(ticket);
      } else {
        result.push({
          groupKey,
          tickets: [ticket],
        });
      }

      return result;
    }, []);
    console.log(groupedTicketsArray);
    setGroupedTickets(groupedTicketsArray);
  };

  const handleGroupingChange = (option) => {
    // Update the grouping state and re-group the tickets
    setGroupBy(option);
    groupTickets(tickets);
  };

  const handleSortChanging = (option) => {
    // Update the grouping state and re-group the tickets
    setSortBy(option);
    sortTickets();
  };

  // Sorting logic can be added here
  const sortTickets = () => {
    const sortedTickets = [...groupedTickets];
    sortedTickets.forEach((group) => {
      switch (sortBy) {
        case 'priority':
          group.tickets.sort((a, b) => b.priority - a.priority);
          break;
        case 'title':
          group.tickets.sort((a, b) => a.title.localeCompare(b.title));
          break;
        default:
          break;
      }
    });
    setGroupedTickets(sortedTickets);
  };

  return (
    <div className="App">
      <KanbanBoard
        groupBy={groupBy}
        groupedTickets={groupedTickets}
        handleGroupingChange={handleGroupingChange}
        handleSortChanging={handleSortChanging}
        users={users}
      />
    </div>
  );
}

export default App;
