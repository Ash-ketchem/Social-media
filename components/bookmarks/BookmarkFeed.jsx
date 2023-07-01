"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

import axios from "axios";
import bookmarkStore from "@/stores/bookmarkStore";
import BookmarkItem from "./BookmarkItem";
import { addToast } from "../toasts/Toasts";
import Header from "../common/Header";

const BookmarkFeed = ({ initialsPosts, cursor = null, loggedUserId }) => {
  const bookmarks = bookmarkStore((state) => state.bookmarks);
  const addBookmarks = bookmarkStore((state) => state.addBookmarks);

  console.log("bookmarks ", bookmarks);

  const [loading, setLoading] = useState(false);

  const tarckerRef = useRef(null);
  const newCursor = useRef(cursor);
  const observer = useRef(null);
  const allDataFetched = useRef(false);

  console.log("logged user id ", loggedUserId);

  //   if (!initialsPosts) return null;

  const fetchPosts = useCallback(async () => {
    if (allDataFetched.current) {
      return addToast({
        type: "info",
        label: "no new data to fetch",
      });
    }

    try {
      setLoading(true);

      if (!cursor) return;

      const res = await axios.get(`/api/bookmark?cursor=${newCursor.current}`);

      // console.log(res);

      if (res.status === 200) {
        if (!res.data?.length) {
          allDataFetched.current = true;
        } else {
          if (newCursor.current !== res.data[0]?.id) {
            newCursor.current = res.data[0]?.id;
            addBookmarks(
              res.data
                .map((post) => ({
                  ...post,
                }))
                .reverse()
            );
          }
        }
      } else {
        throw new Error(res.error);
      }
    } catch (error) {
      console.log(error);
      // addToast({
      //   type: "error",
      //   label: "something went wrong",
      // });
      // allDataFetched.current = true;
    } finally {
      setLoading(false);
    }
  }, [loading, bookmarks]);

  useEffect(() => {
    if (!observer.current) {
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting) {
          if (!loading) {
            console.log("going for a fetch");
            // call the function to load posts
            fetchPosts();
          }
        }
      });
    }
    const currentObserver = observer.current;

    if (tarckerRef.current) {
      currentObserver.observe(tarckerRef.current);
    }
    return () => {
      //remove the observer
      if (tarckerRef.current) {
        currentObserver.unobserve(tarckerRef.current);
      }
    };
  }, [loading]);

  useEffect(() => {
    if (initialsPosts?.length) addBookmarks(initialsPosts);
  }, [initialsPosts]);

  return (
    <>
      <Header label="Bookmarks" showBackArrow />
      <div className="flex flex-col gap-2">
        {loggedUserId ? (
          <>
            <>
              {bookmarks.map((bookmark) => (
                <BookmarkItem bookmark={bookmark} key={bookmark.id} />
              ))}
            </>
            {loading ? (
              <div className="flex justify-center items-center">
                <span className="loading loading-dots loading-lg "></span>
              </div>
            ) : (
              <div className="h-[1px]  w-full" ref={tarckerRef} />
            )}
          </>
        ) : (
          <div className="flex justify-center items-center h-screen w-full">
            login to use
          </div>
        )}
      </div>
    </>
  );
};

export default BookmarkFeed;
