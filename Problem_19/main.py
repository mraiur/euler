# You are given the following information, but you may prefer to do some research for yourself.
#
#     1 Jan 1900 was a Monday.
#     Thirty days has September,
#     April, June and November.
#     All the rest have thirty-one,
#     Saving February alone,
#     Which has twenty-eight, rain or shine.
#     And on leap years, twenty-nine.
#     A leap year occurs on any year evenly divisible by 4, but not on a century unless it is divisible by 400.
#
# How many Sundays fell on the first of the month during the twentieth century (1 Jan 1901 to 31 Dec 2000)?

thirtyDayMonths = [4, 6, 9, 11]
leftDays = 0
occurrences = 0

for y in range(0, 101):
    year = 1900+y
    isLeap = y % 4 == 0

    if year % 100 == 0 and year % 400 != 0:
        isLeap = False

    for m in range(1, 13):
        mDays = 31
        if m == 2:
            mDays = 29 if isLeap else 28
        if m in thirtyDayMonths:
            mDays = 30
        if leftDays == 6: # Days before first of the month are 6
            if 1900 < year <= 2000:
                occurrences += 1
        leftDays = (leftDays+mDays) % 7

print("Total", occurrences)

