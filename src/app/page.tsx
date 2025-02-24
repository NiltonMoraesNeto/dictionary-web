"use client";
import { useState, useEffect, useRef } from "react";
import { searchWord } from "@/services/dictionary";
import { DictionaryList } from "@/model/dictionary-model";
import { z } from "zod";
import { HomeComponent } from "@/components/common/home-component";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontFamily, setFontFamily] = useState("sans-serif");
  const [word, setWord] = useState("");
  const [data, setData] = useState<DictionaryList | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [wordNotFound, setWordNotFound] = useState("");
  const phonetics = data?.phonetics || [];

  const wordSchema = z.object({
    word: z.string().min(1, "Whoops, can’t be empty…"),
  });

  useEffect(() => {
    const fetchWord = async () => {
      if (word.trim() === "") {
        setLoading(false);
        setError("");
        setWordNotFound("");
        setData(null);
        return;
      }
      try {
        const response = await searchWord(word);
        if (response.length > 0) {
          setData(response[0]);
          setError("");
          setWordNotFound("");
        } else {
          setWordNotFound(
            "Sorry pal, we couldn't find definitions for the word you were looking for. You can try the search again at later time or head to the web instead."
          );
          setData(null);
        }
      } catch {
        setError("Failed to fetch data");
        setData(null);
      }
      setLoading(false);
    };

    fetchWord();
  }, [word]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const phoneticAudio = phonetics.find((p) => p.audio)?.audio;

  const handlePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
        audioRef.current.onended = () => setIsPlaying(false);
      }
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      wordSchema.parse({ word });
      setError("");
      setWordNotFound("");
      const response = await searchWord(word);
      if (response.length > 0) {
        setData(response[0]);
        setError("");
        setWordNotFound("");
      } else {
        setWordNotFound(
          "Sorry pal, we couldn't find definitions for the word you were looking for. You can try the search again at later time or head to the web instead."
        );
        setData(null);
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errorMessage = err.errors?.[0]?.message || "Unknown error";
        setError(errorMessage);
        setData(null);
      } else {
        setError("An unexpected error occurred");
        setData(null);
      }
    }
    setLoading(false);
  };

  return (
    <HomeComponent
      isDarkMode={isDarkMode}
      fontFamily={fontFamily}
      setFontFamily={setFontFamily}
      setIsDarkMode={setIsDarkMode}
      setWord={setWord}
      word={word}
      error={error}
      handleSubmit={handleSubmit}
      loading={loading}
      data={data}
      handlePlay={handlePlay}
      audioRef={audioRef}
      phoneticAudio={phoneticAudio}
      wordNotFound={wordNotFound}
    />
  );
}
