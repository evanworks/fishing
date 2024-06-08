import time, random, sys

daycount = 1
rating = 5
money = 0

## SHOP ITEMS

bait = 5
worms = 0
fakefish = 0
squidbait = 0

fishAmounts = {
    "crab": 0, "dolphin": 0, "fish": 0,
    "lobster": 0, "octopus": 0, "oyster": 0,
    "pufferfish": 0, "seal": 0, "shark": 0,
    "shrimp": 0, "squid": 0, "tropical fish": 0, "whale": 0
}

def slowtext (text, speed, red=False):
    for word in text:
        if red == True:
            print(word, end="", file=sys.stderr)
        else:
            print(word, end="")
        time.sleep(speed)

def createfish():
    global crab
    crab = Fish("crab", "🦀", 2, 0.5, 48, 0)
    dolphin = Fish("dolphin", "🐬", 1, 60, 276, 0)
    fish = Fish("fish", "🐟", 2, 0.2, 60, 0)

class Fish:
    def __init__(self, name, emoji, area, minsize, maxsize, money):
        self.name = name
        self.emoji = emoji
        self.area = area
        self.minsize = minsize
        self.maxsize = maxsize
        self.money = money
def intro():
    createfish();
    slowtext("\"It's hard to fish for a living, man.\"", 0.1)
    slowtext("\nThis is what your friends say as you leave \nthe city and head to a small fishing village \nto pursue your dream.", 0.1)
    slowtext("\n\nIt isn't what you expected.\n", 0.2)

def displayfish(name, size, price, legendary=False):
    if name[0] in "aeiou":
        title_display = "You caught an " + name.upper() + "\n"
    else:
        title_display = "You caught a " + name.upper() + "\n"
    if legendary:
        title_display = name.upper() + "\n"
    gold = price + round(size/8)
    size_display = "Size: " + str(size) + "in.\n"
    gold_display = "Gold: $" + str(gold) + "\n\n"
    global money
    global bait, worms, fakefish, squidbait
    if squidbait > 0:
        squidbait -= 1
    elif fakefish > 0:
        fakefish -= 1
    elif worms > 0:
        worms -= 1
    else:
        bait -= 1
    money += gold
    if legendary:
        slowtext("YOU CAUGHT A LEGENDARY!\n", 0.2, True)
    slowtext(title_display, 0.1, True)
    if not legendary:
        pass
        slowtext(size_display, 0.05, True)
    slowtext(gold_display, 0.05, True)

def buyitem(name, price, emoji, variable):
    global money, daycount
    while True:
        print("How many " + name + " would you like? \n(Q) to cancel purchase.")
        choice = input("> ")
        if choice.startswith("q") or "Q" in choice:
            break
        try:
            choice = int(choice)
            if (money >= price * choice):
                money -= price * choice
                print("- " + str(price * choice) + "$")
                print("+ " + str(choice) + emoji)
                slowtext("Thank you for your purchase!", 0.05)
                return choice
            else:
                slowtext("You don't have enough money. Go fishing!", 0.05)
                break
        except ValueError:
            print(choice + " is not a number.")

def fishing():
    global daycount, rating
    casts = 7
    print("Where will you be fishing today?")
    print("\t(1) The lake")
    if rating >= 20:
        print("\t(2) The ocean")
    else:
        print("\t(?) ???")
    choice = input("> ")
    if choice.startswith("l") or choice.startswith("1") or "lake" in choice:
        while True:
            if casts > 0:
                if bait == 0 and worms == 0 and fakefish == 0 and squidbait == 0:
                    slowtext("Out of bait! You can buy more at the shop.\n", 0.05)
                    break
                else:
                    if bait > 0:
                        print(str(bait) + "🪝", end=" ")
                    if worms > 0:
                        print(str(worms) + "🪱", end=" ")
                    if fakefish > 0:
                        print(str(fakefish) + "🐟", end=" ")
                    if squidbait > 0:
                        print(str(squidbait) + "✒️", end=" ")
                    print("\n")
                    print("Press ENTER to cast your lure or Q to go to bed.")
                    choice = input()
                    worm_multiplier = 0
                    legend_multiplier = 0
                    if choice.startswith("q") or "Q" in choice:
                        break
                    if squidbait > 0:
                        num = random.randint(1, 141)
                        print("I heart squidward and squidbait.")
                        worm_multiplier = 30
                        legend_multiplier = 3
                    elif worms > 0:
                        num = random.randint(1, 141)
                        worm_multiplier = 15
                    else:
                        num = random.randint(1, 111)
                    if num <= 14:
                        displayfish("crab (🦀)", random.randint(1, 48), 15)
                        rating += 0.1
                    elif num <= 52 + worm_multiplier and num > 20:
                        displayfish("fish (🐟)", random.randint(1, 60), 9)
                        rating += 0.15
                    elif num <= 58 + (worm_multiplier * 2) and num > 52 + worm_multiplier:
                        displayfish("octopus (🐙)", random.randint(1, 360), 14)
                        rating += 0.3
                    elif num <= 88 + (worm_multiplier * 2) and num > 58 + (worm_multiplier * 2):
                        displayfish("oyster (🦪)", random.randint(1, 14), 17)
                        rating += 0.1
                    elif num <= 108 + (worm_multiplier * 2) and num > 88 + (worm_multiplier * 2):
                        displayfish("shrimp (🦐)", random.randint(1, 12), 4)
                        rating += 0.05
                    elif num <= 110 + (worm_multiplier * 2) + legend_multiplier and num > 108 + (worm_multiplier * 2):
                        displayfish("pearl (⚪)", 0, 500, True)
                        rating += 1
                    elif num <= 111 + (worm_multiplier * 2) + (legend_multiplier * 2) and num > 110 + (worm_multiplier * 2) + legend_multiplier:
                        if (daycount > 30 and rating > 60):
                            displayfish("yourself (👨‍🦲)", 0, 10000)
                            rating += 5
                    casts -= 1
            else:
                slowtext("You are too tired to fish any longer.\n", 0.05)
                break
    else:
        while True:
            if casts > 0:
                if bait > 0:
                    print(str(bait) + "🪝")
                    print("\nPress ENTER to cast your rod into the lake or Q to go home.")
                    choice = input()
                    "🐋🦞"
                    if choice.startswith("q") or "Q" in choice:
                        break
                    if not choice.startswith("q"):
                        num = random.randint(1, 71)
                        if num <= 4:
                            displayfish("crab (🦀)", random.randint(1, 48), 200)
                        elif num <= 6 and num > 4:
                            displayfish("dolphin (🐬)", random.randint(60, 276), 200)
                        elif num <= 16 and num > 6:
                            displayfish("fish (🐟)", random.randint(1, 60), 100)
                        elif num <= 20 and num > 16:
                            displayfish("octopus (🐙)", random.randint(1, 360), 100)
                        elif num <= 25 and num > 20:
                            displayfish("oyster (🦪)", random.randint(1, 14), 150)
                        elif num <= 32 and num > 25:
                            displayfish("pufferfish (🐡)", random.randint(1, 26), 200)
                        elif num == 33:
                            displayfish("seal (🦭)", 0, 1000, True)
                        elif num <= 38 and num > 33:
                            displayfish("shark (🦈)", random.randint(8, 744), 200)
                        elif num <= 48 and num > 38:
                            displayfish("shrimp (🦐)", random.randint(1, 12), 50)
                        elif num <= 53 and num > 48:
                            displayfish("squid (🦑)", random.randint(0, 516), 100)
                        elif num <= 68 and num > 53:
                            displayfish("tropical fish (🐠)", random.randint(1, 100), 150)
                        else:
                            displayfish("whale (🐳)", random.randint(100, 1200), 150)
                else:
                    slowtext("Out of bait! You can buy more at the shop.", 0.05)
                    break
            else:
                slowtext("You are too tired to fish any longer.", 0.05)
                break
            


def shop():
    global money, daycount, bait, worms, fakefish, squidbait
    print("\n$" + str(money) + "\t\t\t🪝" + str(bait))
    print("\nWelcome to the shop!")
    print("We have a wide variety of fishing supplies.")
    print("\t(1) View Bait")
    print("\t(2) View Fishing Gear")
    print("\t(3) View Gadgets")
    print("\t(Q) Leave Shop")
    choice = input("> ")
    if choice.startswith("b") or choice.startswith("1") or "bait" in choice:
        while True:
            print("\nBAIT SHOP")
            print("---------")
            print("Type the item's number to make a purchase.")
            print("Type (i) and the item's number to view more information.")
            print("Type (Q) to leave the shop.")
            print("\t1 (🪝) Bait -------------- $5")
            print("\t2 (🪱) Worms ------------ $10")
            if rating >= 20:
                print("\t3 (🐟) Fake Fish -------- $15") 
            else:
                print("\t(???) You ain't ready for this one yet.")
            if rating >= 40:
                print("\t3 (✒️) Squid Bait ------- $25")
            else:
                print("\t(???) You ain't ready for this one yet.")
            choice = input("> ")
            if choice.startswith("q") or "Q" in choice:
                break
            if "i" in choice and "1" in choice:
                slowtext("Bait is a necessity for catching fish.\nIt gets the job done.\n", 0.05)
            if "i" in choice and "2" in choice:
                slowtext("Worms are a step up from basic bait.\nCatch more big fish and less trash.\n", 0.05)
            if "i" in choice and "3" in choice and rating >= 20:
                slowtext("Fake fish are for the trash haters.\nFish up almost no trash with this bait.\n", 0.05)
            if "i" in choice and "4" in choice and rating >= 40:
                slowtext("Bring up the legends from under the \nsea with this squid bait.\n", 0.05)
            
            if choice == "1":
                amount = buyitem("pieces of bait", 10, "🪝", bait)
                if amount != None:
                    bait += amount
            if choice == "2":
                amount = buyitem("worms", 15, "🪱", worms)
                if amount != None:
                    worms += amount
            if choice == "3" and rating >= 20:
                amount = buyitem("fake fish", 20, "🐟", fakefish)
                if amount != None:
                    fakefish += amount
            if choice == "4" and rating >= 40:
                amount = buyitem("squid bait", 30, "✒️", squidbait)
                if amount != None:
                    squidbait += amount

                    
    elif choice.startswith("f") or choice.startswith("2") or "fish" in choice:
        while True:
            print("\nFISHING GEAR SHOP")
            print("-------------------")
            print("Type the item's number to make a purchase.")
            print("Type (i) and the item's number to view more information.")
            print("Type (Q) to leave the shop.")
            print("\t1 (🎣) Fishing Rod ------------ $100")
            if rating >= 30:
                print("\t2 (🕸️) Fishing Net ------------ $500")
            else:
                print("\t(???) You ain't ready for this one yet.")
            if rating >= 50:
                print("\t2 (⛵) Fishing Boat ---------- $1000")
            else:
                print("\t(???) You ain't ready for this one yet.")
            if "i" in choice and "1" in choice:
                slowtext("Reach farther out into the water to \ncatch less trash and more expensive fish.\n", 0.05)
            if "i" in choice and "2" in choice and rating >= 30:
                slowtext("Catch much more and better fish with \nthis big net.", 0.05)
            if "i" in choice and "3" in choice and rating >= 50:
                slowtext("Get farther out into the water and \ncatch the best-quality fish.", 0.05)
                
        
def main():
    global rating
    daycount = 1
    while True:
        print("=" * 22, file=sys.stderr)
        print("\tDAY " + str(daycount), file=sys.stderr)
        print("=" * 22, file=sys.stderr)
        if daycount == 1:
            slowtext("Welcome to Fishdale! The townsfolk here do not respect newcomers. \nGo fishing this morning to prove your worth as a good fisher.", 0.1)
        elif daycount == 2 and rating > 5:
            slowtext("You made it through the first day! The townsfolk are not impressed \nby the fish you caught.", 0.1)
        elif daycount == 2 and rating <= 5:
            slowtext("You made it through the first day! The townsfolk seem to like you \nless after yesterday.", 0.1)
        elif daycount == 3:
            slowtext("A terrible rain makes the windows of your cottage rattle. The townsfolk \nall stay huddled in their homes.", 0.1)
        elif daycount == 3 and rating > 5.5:
            slowtext("The townsfolk are impressed by the way you braved the storm to \ngo fishing yesterday.", 0.1)
        elif daycount == 3 and rating < 5.5:
            slowtext("The townsfolk, despite sleeping in themselves, say that good fishers \nalways brave the storms.", 0.1)
        elif daycount == 4:
            slowtext("The storm lets up this morning and the streets are full of townsfolk \nwho still doubt your fishing skills. It might take longer \nto convince them...", 0.1)
        elif daycount == 5:
            slowtext("Upon walking home to your cottage last night, a fisherman named Bill \nasks to talk to you.\n", 0.1)
            slowtext("The conversation was slow and akward, but now you have at least one \nsupporter in this town of uncertainty.", 0.1)
        elif daycount > 3 and daycount % 3 == 0:
            slowtext("Rain pounds at your cottage windows and doors. No one seems to be \noutside, but you can't see through the pouring rain.", 0.1)

        if rating > 6.5 and rating < 7.5:
            slowtext("A shopkeeper who's name you don't know congratulates you on your\nmost recent catch.", 0.1)
        if rating > 8.5 and rating < 9.5:
            slowtext("You start to meet more new people in town on your way to fishing at \nthe lake. Many of the townsfolk still doubt your fishing skills.")
        if rating > 10.5 and rating < 9.5:
            slowtext("You step outside this morning and the clouds blot out the sun. You've focused \nso much time on fishing that you might need to take a while \nto contemplate how far you've come in this town.", 0.1)
            slowtext("10 FRIENDSHIP POINTS!", 0.2)
        while True:
            print("\n$" + str(money), end=" ")
            if bait > 0:
                print(str(bait) + "🪝", end=" ")
            if worms > 0:
                print(str(worms) + "🪱", end=" ")
            if fakefish > 0:
                print(str(fakefish) + "🐟", end=" ")
            if squidbait > 0:
                print(str(squidbait) + "✒️", end=" ")
            print("\nWhat shall it be today?")
            print("\t(1) Go to bed")
            print("\t(2) Go fishing!")
            if (bait < 4 and worms < 4 and fakefish < 4 and squidbait < 4):
                print("\t(3) Go shopping <-- BUY BAIT HERE")
            else:
                print("\t(3) Go shopping")
            print("\t(Q) Save and quit")
            print("rating =", rating)
            choice = input("> ")
            if choice.startswith("b") or choice.startswith("1") or "bed" in choice:
                daycount += 1
                rating -= 0.5
                slowtext("You go to bed early. The townsfolk do not respect this decision.\n", 0.1)
                break
            if choice.startswith("f") or choice.startswith("2") or "fish" in choice:
                fishing()
                daycount += 1
                break
            if choice.startswith("s") or choice.startswith("3") or "shop" in choice:
                shop()
                daycount += 1
                break
            

main()
