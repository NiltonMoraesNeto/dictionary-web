import { Dispatch, RefObject, SetStateAction } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Moon, Search, Sun } from "lucide-react";
import IconBook from "@/components/common/icon-book";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import LoadingSpin from "./loading-spin";
import Image from "next/image";
import { DictionaryList } from "@/model/dictionary-model";
import IconPlay from "./icon-play";

interface HomeComponentProps {
  isDarkMode: boolean;
  fontFamily: string;
  setFontFamily: Dispatch<SetStateAction<string>>;
  setIsDarkMode: (value: SetStateAction<boolean>) => void;
  setWord: (value: SetStateAction<string>) => void;
  word: string;
  error: string;
  handleSubmit: () => Promise<void>;
  loading: boolean;
  data: DictionaryList | null;
  handlePlay: () => void;
  audioRef: RefObject<HTMLAudioElement | null>;
  phoneticAudio: string | undefined;
  wordNotFound: string;
}

export function HomeComponent({
  isDarkMode,
  fontFamily,
  setFontFamily,
  setIsDarkMode,
  setWord,
  word,
  error,
  handleSubmit,
  loading,
  data,
  handlePlay,
  audioRef,
  phoneticAudio,
  wordNotFound,
}: HomeComponentProps) {
  return (
    <div className={`min-h-screen bg-background ${isDarkMode ? "dark" : ""}`}>
      <div
        className={`bg-background text-foreground p-4 max-w-2xl mx-auto
    ${fontFamily === "sans-serif" ? "font-sans" : ""}
    ${fontFamily === "serif" ? "font-serif" : ""}
    ${fontFamily === "mono" ? "font-mono" : ""}
  `}
      >
        <header className="flex justify-between items-center mb-6">
          <IconBook />

          <div className="flex items-center gap-4">
            <Select defaultValue="sans-serif" onValueChange={setFontFamily}>
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sans-serif">Sans Serif</SelectItem>
                <SelectItem value="serif">Serif</SelectItem>
                <SelectItem value="mono">Mono</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center space-x-2">
              <Switch
                id="theme-mode"
                onClick={() => setIsDarkMode(!isDarkMode)}
              />
              <Label htmlFor="theme-mode" className="cursor-pointer">
                {isDarkMode ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Label>
            </div>
          </div>
        </header>

        <div className="mb-8 relative">
          <Input
            type="search"
            placeholder="Search for any word..."
            onChange={(e) => setWord(e.target.value)}
            value={word}
            className={`w-full pr-10 ${error ? "border-red-500" : ""}`}
          />
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-purple-500"
            onClick={handleSubmit}
          >
            <Search size={20} />{" "}
          </span>
        </div>

        {loading && <LoadingSpin />}
        {error && <p className="text-red-500">{error}</p>}
        {wordNotFound && (
          <>
            <div className="flex justify-center mb-5">
              <Image src="/emoji.png" alt="emoji icon" width={50} height={50} />
            </div>
            <h1 className="flex justify-center mb-3">No Definitions Found</h1>
            <p className="text-[#757575]">{wordNotFound}</p>
          </>
        )}

        {data && (
          <main className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-bold mb-2">{data.word}</h1>
                <p className="text-purple-500">{data.phonetic}</p>
              </div>
              <div className="flex items-center gap-2">
                <span onClick={handlePlay} className="cursor-pointer">
                  <IconPlay size={75} />
                </span>

                <audio ref={audioRef} src={phoneticAudio} />
              </div>
            </div>
            {data.meanings.map((meaning, index) => (
              <section key={index}>
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-lg italic">{meaning.partOfSpeech}</h2>
                  <div className="h-[1px] flex-1 bg-muted" />
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-muted-foreground mb-4">Meaning</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {meaning.definitions.map((def, defIndex) => (
                        <li
                          key={defIndex}
                          className="text-gray-800 dark:text-white list-inside list-disc marker:text-purple-500"
                        >
                          {def.definition}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {meaning.synonyms.length > 0 && (
                    <div>
                      <h3 className="text-muted-foreground mb-4">Synonyms</h3>
                      <p className="text-purple-500">
                        {meaning.synonyms.join(", ")}
                      </p>
                    </div>
                  )}
                </div>
              </section>
            ))}
            {Array.isArray(data.sourceUrls) && (
              <footer className="text-sm text-muted-foreground pt-4 border-t">
                <p>
                  Source:{" "}
                  <a
                    href={data.sourceUrls.join(", ")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    {data.sourceUrls.map((url, index) => (
                      <span key={index}>{url}</span>
                    ))}
                  </a>
                </p>
              </footer>
            )}
          </main>
        )}
      </div>
    </div>
  );
}
