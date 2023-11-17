// KanbanBoard.js
import React from 'react';
import Controls from './Controls';
import KanbanColumn from './KanbanColumn';

const KanbanBoard = ({ groupedTickets, handleGroupingChange, handleSortChanging, groupBy, users}) => (
  <div>
    <Controls handleGroupingChange={handleGroupingChange} handleSortChanging={handleSortChanging} />
    <div className="kanban-board">
      {/* Render columns based on the grouping state */}
      {groupedTickets.map((group) => (
        <KanbanColumn key={group.groupKey} groupKey={group.groupKey} tickets={group.tickets} groupBy = {groupBy} users = {users} />
      ))}
    </div>
  </div>
);

export default KanbanBoard;
