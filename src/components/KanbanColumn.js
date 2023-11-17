// KanbanColumn.js
import React from "react";
import Card from "react-bootstrap/Card";
import profileImageUrl from "./profileImage.svg";
import signalImage from "./signal.svg";
import doneImage from "./completed.svg";
import pendingImage from "./pending.svg";
import addImage from "./plus.svg";
import moreImage from "./dots.svg";
const getUserNameAndAvailability = (user_id, users) => {
  console.log(typeof users);

  if (typeof users === "object" && users !== null) {
    const userKeys = Object.keys(users);

    for (const key of userKeys) {
      const user = users[key];

      if (user.id === user_id) {
        return { name: user.name, availability: user.availability };
      }
    }
  }

  return { name: "No name", availability: "Unknown" };
};


const KanbanColumn = ({ groupKey, tickets, groupBy, users}) => (
  <div style={{ textAlign: "center" }} key={groupKey} className="kanban-column">
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
    <div
      style={{
        textAlign : 'left',
        fontSize: "0.8rem",
        color: "grey",
        marginBottom: "0rem",
      }}
    >
      {groupBy === "userId" ? (
        <>
          <img
            src={profileImageUrl}
            alt="Profile"
            style={{
              opacity: "0.5",
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      marginLeft: "10px",
            }}
          />
        </>
      ) : (
        <>
          {groupBy === "status" ? (
            <>
              {groupKey === "Backlog" ? (
                <>
                  <img
                    src={pendingImage}
                    alt="Profile"
                    style={{
                      opacity: "0.5",
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      marginLeft: "10px",
                    }}
                  />
                </>
              ) : (
                <>
                </>
              )}
            </>
          ) : (
            <></>
          )}
        </>
      )}
      <span style={{ fontSize: "1rem", margin: "0rem 0.5rem", color: "black" }}>
        {groupBy==='userId' ? (<>
          {getUserNameAndAvailability(groupKey, users).name}
        </>): (<>
        {groupBy === 'status' ? (<>
          {groupKey}
        </>) : (<>
          {groupKey===4 ? (<>
            Urgent
          </>) : (<>
            {groupKey===3 ? (<>
              High
          </>) : (<>
            {groupKey===2 ? (<>
              Medium
          </>) : (<>
            {groupKey===1 ? (<>
            Low
          </>) : (<>
            No Priority
          </>)}
          </>)}
          </>)}
          </>)}
        </>)}
        </>)}
      </span>
      <span style={{ minWidth: "2rem" }}></span> {tickets.length}
    </div>
    <div style={{textAlign : 'right'}}>
    <img
            src={addImage}
            alt="Profile"
            style={{
              opacity: "0.6",
              width: "1.4rem",
              height: "1.4rem",
              borderRadius: "50%",
            }}
          />
          <img
            src={moreImage}
            alt="Profile"
            style={{
              opacity: "0.6",
              width: "1.4rem",
              height: "1.4rem",
              borderRadius: "50%",
            }}
          />
    </div>
    </div>

    {/* Render tickets within each column */}
    {tickets.map((ticket) => (
      <Card
        className="shadow"
        style={{
          maxHeight: "9rem",
          width: "100%",
          display: "inline-block",
          margin: "0.1rem",
        }}
        key={ticket.id}
      >
        <Card.Body>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Card.Title
              style={{
                textAlign: "left",
                fontSize: "0.8rem",
                color: "grey",
                marginBottom: "0rem",
              }}
            >
              {ticket.id}
            </Card.Title>
            {groupBy === "userId" ? (
              <></>
            ) : (
              <>
                <img
                  src={profileImageUrl}
                  alt="Profile"
                  style={{
                    opacity: "0.5",
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    marginLeft: "10px",
                  }}
                />
              </>
            )}
          </div>
          <Card.Text>
            <p
              style={{
                textAlign: "left",
                fontWeight: "500",
                color: "black",
                marginTop: "0rem",
              }}
            >
              {ticket.title.length > 50 ? (
                <>{ticket.title.substring(0, 50)}....</>
              ) : (
                <>{ticket.title}</>
              )}
            </p>
            <p style={{ textAlign: "left", fontSize: "0.8rem" }}>
              <img
                style={{ height: "1rem", marginRight: "0.5rem" }}
                src={signalImage}
              ></img>
              {ticket.tag}
            </p>
          </Card.Text>
        </Card.Body>
      </Card>
    ))}
  </div>
);

export default KanbanColumn;
