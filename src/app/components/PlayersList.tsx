import * as React from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function PlayersList() {
  return (
    <section
      aria-labelledby="players-list-title"
      className="rounded-xl border border-zinc-200 bg-white text-zinc-950 shadow dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
    >
      <header className="flex flex-col gap-3 p-6">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <h3
              id="players-list-title"
              className="font-semibold leading-none tracking-tight"
            >
              Players
            </h3>
            <Select name="numberOfPlayers" defaultValue="3">
              <SelectTrigger
                className="w-16"
                aria-label="Number of Players"
                id="numberOfPlayers"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="6">6</SelectItem>
                <SelectItem value="7">7</SelectItem>
                <SelectItem value="8">8</SelectItem>
                <SelectItem value="9">9</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="11">11</SelectItem>
                <SelectItem value="12">12</SelectItem>
                <SelectItem value="13">13</SelectItem>
                <SelectItem value="14">14</SelectItem>
                <SelectItem value="15">15</SelectItem>
                <SelectItem value="16">16</SelectItem>
                <SelectItem value="17">17</SelectItem>
                <SelectItem value="18">18</SelectItem>
                <SelectItem value="19">19</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="21">21</SelectItem>
                <SelectItem value="22">22</SelectItem>
                <SelectItem value="23">23</SelectItem>
                <SelectItem value="24">24</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="26">26</SelectItem>
                <SelectItem value="27">27</SelectItem>
                <SelectItem value="28">28</SelectItem>
                <SelectItem value="29">29</SelectItem>
                <SelectItem value="30">30</SelectItem>
                <SelectItem value="31">31</SelectItem>
                <SelectItem value="32">32</SelectItem>
                <SelectItem value="33">33</SelectItem>
                <SelectItem value="34">34</SelectItem>
                <SelectItem value="35">35</SelectItem>
                <SelectItem value="36">36</SelectItem>
                <SelectItem value="37">37</SelectItem>
                <SelectItem value="38">38</SelectItem>
                <SelectItem value="39">39</SelectItem>
                <SelectItem value="40">40</SelectItem>
                <SelectItem value="41">41</SelectItem>
                <SelectItem value="42">42</SelectItem>
                <SelectItem value="43">43</SelectItem>
                <SelectItem value="44">44</SelectItem>
                <SelectItem value="45">45</SelectItem>
                <SelectItem value="46">46</SelectItem>
                <SelectItem value="47">47</SelectItem>
                <SelectItem value="48">48</SelectItem>
                <SelectItem value="49">49</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="51">51</SelectItem>
                <SelectItem value="52">52</SelectItem>
                <SelectItem value="53">53</SelectItem>
                <SelectItem value="54">54</SelectItem>
                <SelectItem value="55">55</SelectItem>
                <SelectItem value="56">56</SelectItem>
                <SelectItem value="57">57</SelectItem>
                <SelectItem value="58">58</SelectItem>
                <SelectItem value="59">59</SelectItem>
                <SelectItem value="60">60</SelectItem>
                <SelectItem value="61">61</SelectItem>
                <SelectItem value="62">62</SelectItem>
                <SelectItem value="63">63</SelectItem>
                <SelectItem value="64">64</SelectItem>
                <SelectItem value="65">65</SelectItem>
                <SelectItem value="66">66</SelectItem>
                <SelectItem value="67">67</SelectItem>
                <SelectItem value="68">68</SelectItem>
                <SelectItem value="69">69</SelectItem>
                <SelectItem value="70">70</SelectItem>
                <SelectItem value="71">71</SelectItem>
                <SelectItem value="72">72</SelectItem>
                <SelectItem value="73">73</SelectItem>
                <SelectItem value="74">74</SelectItem>
                <SelectItem value="75">75</SelectItem>
                <SelectItem value="76">76</SelectItem>
                <SelectItem value="77">77</SelectItem>
                <SelectItem value="78">78</SelectItem>
                <SelectItem value="79">79</SelectItem>
                <SelectItem value="80">80</SelectItem>
                <SelectItem value="81">81</SelectItem>
                <SelectItem value="82">82</SelectItem>
                <SelectItem value="83">83</SelectItem>
                <SelectItem value="84">84</SelectItem>
                <SelectItem value="85">85</SelectItem>
                <SelectItem value="86">86</SelectItem>
                <SelectItem value="87">87</SelectItem>
                <SelectItem value="88">88</SelectItem>
                <SelectItem value="89">89</SelectItem>
                <SelectItem value="90">90</SelectItem>
                <SelectItem value="91">91</SelectItem>
                <SelectItem value="92">92</SelectItem>
                <SelectItem value="93">93</SelectItem>
                <SelectItem value="94">94</SelectItem>
                <SelectItem value="95">95</SelectItem>
                <SelectItem value="96">96</SelectItem>
                <SelectItem value="97">97</SelectItem>
                <SelectItem value="98">98</SelectItem>
                <SelectItem value="99">99</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button aria-label="Import Players" type="button" variant="secondary">
            Import Players
          </Button>
        </div>
        {/* This div is hidden intentionally to be shown later when Import Players button is clicked */}
        <div className="hidden flex flex-col gap-2">
          <Label className="text-sm text-gray-600" htmlFor="import-players">
            Insert or paste a list of players. One player per line. Optionally,
            add position and skill separated by commas.
          </Label>
          <Textarea
            placeholder="e.g., Ronaldo, Forward, High"
            rows={7}
            id="import-players"
          />
          <div className="flex gap-2 items-center justify-between">
            <Button
              type="button"
              aria-label="Cancel Import Players"
              variant="outline"
            >
              Cancel
            </Button>
            <Button type="button" aria-label="Confirm Import Players">
              Confirm Import
            </Button>
          </div>
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Choose the number of players, then enter each player's name, position,
          and skill level. Optionally, import a list of players.
        </p>
      </header>

      <div className="flex flex-col gap-4 p-6 pt-0">
        <ul className="flex flex-col gap-1">
          <li className="flex gap-1 items-center">
            <div className="w-8 text-center p-1">1</div>

            <Input
              className="flex-1"
              type="text"
              placeholder="Player 1"
              aria-label="Player Name 1"
              name="playerName1"
              id="playerName1"
              required
            />

            <Select name="playerPosition" required>
              <SelectTrigger
                className="w-32"
                aria-label="Player Position 1"
                id="playerPosition1"
              >
                <SelectValue placeholder="Position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="goalkeeper">Goalkeeper</SelectItem>
                <SelectItem value="defender">Defender</SelectItem>
                <SelectItem value="midfielder">Midfielder</SelectItem>
                <SelectItem value="forward">Forward</SelectItem>
              </SelectContent>
            </Select>
            <Select name="playerSkill1" required>
              <SelectTrigger
                className="w-24"
                aria-label="Player Skill 1"
                id="playerSkill1"
              >
                <SelectValue placeholder="Skill" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="destructive"
              aria-label="Delete Player"
              type="button"
            >
              Delete
            </Button>
          </li>
          <li className="flex gap-1 items-center">
            <div className="w-8 text-center p-1">2</div>

            <Input
              className="flex-1"
              type="text"
              placeholder="Player 2"
              aria-label="Player Name 2"
              name="playerName2"
              id="playerName2"
              required
            />

            <Select name="playerPosition2" required>
              <SelectTrigger
                className="w-32"
                aria-label="Player Position 2"
                id="playerPosition2"
              >
                <SelectValue placeholder="Position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="goalkeeper">Goalkeeper</SelectItem>
                <SelectItem value="defender">Defender</SelectItem>
                <SelectItem value="midfielder">Midfielder</SelectItem>
                <SelectItem value="forward">Forward</SelectItem>
              </SelectContent>
            </Select>
            <Select name="playerSkill2" required>
              <SelectTrigger
                className="w-24"
                aria-label="Player Skill 2"
                id="playerSkill2"
              >
                <SelectValue placeholder="Skill" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="destructive"
              aria-label="Delete Player"
              type="button"
            >
              Delete
            </Button>
          </li>
          <li className="flex gap-1 items-center">
            <div className="w-8 text-center p-1">3</div>

            <Input
              className="flex-1"
              type="text"
              placeholder="Player 3"
              aria-label="Player Name 3"
              name="playerName3"
              id="playerName3"
              required
            />

            <Select name="playerPosition3" required>
              <SelectTrigger
                className="w-32"
                aria-label="Player Position 3"
                id="playerPosition3"
              >
                <SelectValue placeholder="Position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="goalkeeper">Goalkeeper</SelectItem>
                <SelectItem value="defender">Defender</SelectItem>
                <SelectItem value="midfielder">Midfielder</SelectItem>
                <SelectItem value="forward">Forward</SelectItem>
              </SelectContent>
            </Select>
            <Select name="playerSkill3" required>
              <SelectTrigger
                className="w-24"
                aria-label="Player Skill 3"
                id="playerSkill3"
              >
                <SelectValue placeholder="Skill" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="destructive"
              aria-label="Delete Player"
              type="button"
            >
              Delete
            </Button>
          </li>
        </ul>
      </div>
      <footer className="flex items-center p-6 pt-0 ">
        <div className="flex gap-1 items-center w-full">
          <Input
            className="flex-1"
            type="text"
            placeholder="Player Name"
            aria-label="Player Name"
            name="playerName"
            id="playerName"
            required
          />

          <Select name="playerPosition" required>
            <SelectTrigger
              className="w-32"
              aria-label="Player Position"
              id="playerPosition"
            >
              <SelectValue placeholder="Position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="goalkeeper">Goalkeeper</SelectItem>
              <SelectItem value="defender">Defender</SelectItem>
              <SelectItem value="midfielder">Midfielder</SelectItem>
              <SelectItem value="forward">Forward</SelectItem>
            </SelectContent>
          </Select>
          <Select name="playerSkill" required>
            <SelectTrigger
              className="w-24"
              aria-label="Player Skill"
              id="playerSkill"
            >
              <SelectValue placeholder="Skill" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="default" aria-label="Add Player" type="button">
            Add Player
          </Button>
        </div>
      </footer>
    </section>
  );
}
