import {
  Avatar,
  Button,
  IconButton,
  Input,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import { HiMiniPaperAirplane } from "react-icons/hi2";
import { formattedDate, formattedDateTime } from "../../../utils/global";
import useNoteStore from "../../../store/useNoteStore";

const NotesPage = () => {
  const response = {
    conversation_id: "c123456789",
    participants: [
      {
        user_id: "u001",
        name: "Alice Smith",
        profile_picture_url:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80",
      },
      {
        user_id: "u002",
        name: "Emma Johnson",
        profile_picture_url:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1288&q=80",
      },
      {
        user_id: "u003",
        name: "Richard Hayes",
        profile_picture_url:
          "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80",
      },
      {
        user_id: "u004",
        name: "Ethan Walker",
        profile_picture_url:
          "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
      },
      {
        user_id: "u005",
        name: "Lucas Carter",
        profile_picture_url:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
      },
    ],
    notes: [
      {
        note_id: "m1001",
        sender_id: "u001",
        note_message: "Hey Emma, how's it going?",
        timestamp: "2025-05-18T14:23:45Z",
      },
      {
        note_id: "m1002",
        sender_id: "u002",
        note_message: "Hey Alice! All good, how about you?",
        timestamp: "2025-05-18T14:24:10Z",
      },
      {
        note_id: "m1003",
        sender_id: "u004",
        note_message: "Hi everyone!",
        timestamp: "2025-05-18T14:24:10Z",
      },
      {
        note_id: "m1004",
        sender_id: "u001",
        note_message: "Doing well! Want to catch up later?",
        timestamp: "2025-05-18T14:25:02Z",
      },
    ],
  };

  const [participants, setParticipants] = useState([]);

  const messagesEndRef = useRef(null);

  const currentUser = {
    user_id: "u001",
    name: "Alice Smith",
    profile_picture_url:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80",
  };

  // const [notes, setNotes] = useState([]);

  const { notes, setNotes } = useNoteStore();

  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim()) {
      setNotes([
        ...notes,
        {
          note_id: `m${Math.floor(Math.random() * 10000)}`,
          sender_id: currentUser.user_id,
          note_message: newMessage,
          timestamp: new Date().toISOString(),
        },
      ]);
      setNewMessage("");
    }
  };

  // Auto-scroll when noteMessage update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [notes]);

  useEffect(() => {
    setNotes(response.notes);
    setParticipants(response.participants);
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex flex-col h-full overflow-y-auto">
        <div className="max-h-[calc(100vh-400px)]">
          <div className="flex flex-col w-full gap-3">
            {notes.map((note, index) => {
              return (
                <div
                  key={index}
                  className={`w-full flex flex-col items-start ${
                    currentUser.user_id === note.sender_id
                      ? "items-end"
                      : "items-start"
                  }`}
                >
                  {/* For current user */}
                  {currentUser.user_id == note.sender_id && (
                    <div className={`bg-blue-200 max-w-[80%] rounded-lg p-2`}>
                      <Typography
                        variant="small"
                        className="font-normal text-sm"
                      >
                        {note.note_message}
                      </Typography>
                    </div>
                  )}

                  {/* For other user */}
                  {currentUser.user_id != note.sender_id && (
                    <div className="flex flex-row gap-2 items-end">
                      {participants.map((participant, index) => {
                        if (participant.user_id == note.sender_id) {
                          return (
                            <Tooltip
                              key={`${note.note_id}-tooltip`}
                              content={
                                <div className="w-30">
                                  <Typography
                                    color="white"
                                    className="font-medium text-sm"
                                  >
                                    {participant.name}
                                  </Typography>
                                  <Typography
                                    variant="small"
                                    color="white"
                                    className="font-normal text-sm opacity-80"
                                  >
                                    {formattedDateTime(note.timestamp)}
                                  </Typography>
                                </div>
                              }
                            >
                              <Avatar
                                key={`${note.note_id}-profile`}
                                variant="circular"
                                alt={participant.name}
                                size="sm"
                                className="border-[1px] border-white hover:z-10 focus:z-10"
                                src={participant.profile_picture_url}
                              />
                            </Tooltip>
                          );
                        }
                        return null;
                      })}
                      <div className={`bg-gray/30 max-w-[80%] rounded-lg p-2`}>
                        <Typography
                          variant="small"
                          className="font-normal text-sm"
                        >
                          {note.note_message}
                        </Typography>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {/* Invisible marker to scroll to */}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="h-[4.5rem] pb-1 pt-3">
        <div className="flex items-center gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            label="Type here..."
            className="flex-1"
            variant="standard"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <IconButton onClick={handleSend} color="blue" size="sm">
            <HiMiniPaperAirplane size={15} />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default NotesPage;
