import { RiUserCommunityFill } from "react-icons/ri";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import Loader from "../Loader";
import axios from "axios";

const CommunityRooms = () => {
  const [discussionsList, setDiscussionList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [postData, setPostData] = useState("");
  const [loading, setLoading] = useState(false);
  const [postCount, setPostCount] = useState(0);
  const [viewReplies, setViewReplies] = useState({});
  const [replyInput, setReplyInput] = useState({});

  const params = useParams();
  const { user, isLoaded: userLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();
  const username = params.username;

  useEffect(() => {
    if (userLoaded && isSignedIn) {
      if (user?.username !== username) {
        navigate(`/${user.username}/community`);
      }
    }
  }, [userLoaded, isSignedIn, user, username, navigate]);

  const handleSendData = async () => {
    if (!postData.trim()) return;
    setLoading(true);
    try {
      await axios.post(
        "https://algosprint-vxi4.onrender.com/api/v1/user/updateDiscussion",
        {
          post: postData,
          username,
        }
      );
      setPostData("");
      setPostCount((prev) => prev + 1);
    } catch (err) {
      console.error("Error adding the post", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendReply = async (idx) => {
    const message = replyInput[idx];
    if (!message.trim()) return;

    try {
      await axios.post(
        "https://algosprint-vxi4.onrender.com/api/v1/user/addReply",
        {
          postId: discussionsList[idx]._id,
          message,
          username: user.username,
        }
      );
      setReplyInput((prev) => ({ ...prev, [idx]: undefined }));
      setPostCount((prev) => prev + 1);
    } catch (err) {
      console.error("Error sending reply:", err);
    }
  };

  useEffect(() => {
    const handleDataFetching = async () => {
      try {
        const res = await axios.get(
          "https://algosprint-vxi4.onrender.com/api/v1/user/discussion",
          { params: { username } }
        );
        setDiscussionList(res.data.data.discussionData || []);
        setPostCount(res.data.data.discussionData.length);
        setIsLoaded(true);
        setHasError(false);
      } catch (err) {
        console.error("Error fetching discussions", err);
        setHasError(true);
        setIsLoaded(false);
      }
    };
    handleDataFetching();
  }, [postCount, username]);

  return (
    <div className="min-h-screen font-[Inter] px-4 py-6 dark:bg-white/3 dark:text-gray-100 transition-all duration-500">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-6 p-6 bg-slate-100 dark:bg-zinc-950 ring-[0.3px] ring-white transition-all duration-500 rounded-xl shadow-lg flex items-center gap-4">
        <div className="p-3 dark:bg-gray-700 rounded-full text-3xl">
          <RiUserCommunityFill />
        </div>
        <div>
          <h1 className="text-2xl font-semibold">Community Space</h1>
          <p className="text-sm text-gray-400">
            Connect with programmers and share your thoughts.
          </p>
        </div>
      </div>

      {/* Discussions */}
      <div className="max-w-4xl mx-auto mb-6 p-6 bg-slate-100 dark:bg-zinc-900 rounded-xl shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Recent Discussions</h2>

        {hasError && <p className="text-red-500">Error fetching discussions</p>}

        {!isLoaded && <Skeleton className="w-full h-48 rounded-md" />}

        {isLoaded &&
          (discussionsList.length > 0 ? (
            discussionsList.map((elem, idx) => (
              <div
                key={idx}
                className="mb-4 p-4 dark:bg-zinc-800 rounded-lg shadow-md"
              >
                <h3 className="font-semibold dark:text-gray-100">
                  {elem.message}
                </h3>
                <div className="flex items-center gap-3 mt-2 text-sm text-gray-400">
                  <img
                    src={elem.user?.profilePicture}
                    alt=""
                    className="w-6 h-6 rounded-full"
                  />
                  <p>{elem.user?.username}</p>
                  <p>Lvl {elem.user?.level}</p>
                  <p>{elem.createdAt?.slice(0, 10)}</p>
                </div>

                {/* Buttons */}
                <div className="mt-3 flex gap-4 text-sm">
                  <button
                    className="text-blue-400 hover:underline"
                    onClick={() =>
                      setViewReplies((prev) => ({ ...prev, [idx]: !prev[idx] }))
                    }
                  >
                    {viewReplies[idx] ? "Hide Replies" : "View Replies"}
                  </button>
                  <button
                    className="text-green-400 hover:underline"
                    onClick={() =>
                      setReplyInput((prev) => ({
                        ...prev,
                        [idx]: prev[idx] !== undefined ? undefined : "",
                      }))
                    }
                  >
                    {replyInput[idx] !== undefined ? "Cancel" : "Reply"}
                  </button>
                </div>

                {/* Show Replies */}
                {viewReplies[idx] && (
                  <div className="mt-2 border-t border-gray-600 pt-2 space-y-1">
                    {elem.reply && elem.reply.length > 0 ? (
                      elem.reply.map((r, rIdx) => (
                        <p key={rIdx} className="text-sm text-gray-200">
                          {r.user && (
                            <div className="flex gap-4 m-2 items-center justify-start">
                              <img
                                className="w-5 rounded-full"
                                src={r.user.profilePicture}
                                alt=""
                              />
                              <strong>{r.user?.username}&nbsp;:</strong>{" "}
                              {r.message}
                            </div>
                          )}
                        </p>
                      ))
                    ) : (
                      <p className="text-sm italic text-gray-400">
                        No replies yet
                      </p>
                    )}
                  </div>
                )}

                {/* Reply Input */}
                {replyInput[idx] !== undefined && (
                  <div className="mt-2 flex gap-2">
                    <input
                      type="text"
                      value={replyInput[idx]}
                      onChange={(e) =>
                        setReplyInput((prev) => ({
                          ...prev,
                          [idx]: e.target.value,
                        }))
                      }
                      placeholder="Write your reply..."
                      className="flex-1 p-2 rounded-md border border-gray-600 bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <Button
                      size="sm"
                      variant="personal"
                      className="text-xs"
                      onClick={() => handleSendReply(idx)}
                    >
                      Send
                    </Button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-400 italic">
              Be the first one to comment here
            </p>
          ))}
      </div>

      {/* Post new discussion */}
      <div className="max-w-4xl mx-auto p-6 bg-zinc-800 rounded-xl shadow-lg">
        <Textarea
          value={postData}
          onChange={(e) => setPostData(e.target.value)}
          placeholder="Share your thoughts..."
          className="mb-2 bg-gray-700 text-gray-100 rounded-md p-3 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <Button onClick={handleSendData} disabled={loading}>
          {loading ? <Loader /> : "Post"}
        </Button>
      </div>
    </div>
  );
};

export default CommunityRooms;
