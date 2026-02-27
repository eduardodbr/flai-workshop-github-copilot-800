from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from datetime import date


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Deleting existing data...')

        Leaderboard.objects.all().delete()
        Activity.objects.all().delete()
        Team.objects.all().delete()
        User.objects.all().delete()
        Workout.objects.all().delete()

        self.stdout.write('Creating users (superheroes)...')

        # Marvel heroes
        iron_man = User.objects.create(name='Iron Man', email='tony.stark@avengers.com', age=40)
        spider_man = User.objects.create(name='Spider-Man', email='peter.parker@avengers.com', age=22)
        black_widow = User.objects.create(name='Black Widow', email='natasha.romanoff@avengers.com', age=35)
        thor = User.objects.create(name='Thor', email='thor.odinson@avengers.com', age=1500)
        captain_america = User.objects.create(name='Captain America', email='steve.rogers@avengers.com', age=105)

        # DC heroes
        batman = User.objects.create(name='Batman', email='bruce.wayne@justiceleague.com', age=38)
        superman = User.objects.create(name='Superman', email='clark.kent@justiceleague.com', age=35)
        wonder_woman = User.objects.create(name='Wonder Woman', email='diana.prince@justiceleague.com', age=3000)
        flash = User.objects.create(name='The Flash', email='barry.allen@justiceleague.com', age=28)
        aquaman = User.objects.create(name='Aquaman', email='arthur.curry@justiceleague.com', age=36)

        self.stdout.write('Creating teams...')

        # Team Marvel
        team_marvel = Team.objects.create(name='Team Marvel')
        team_marvel.members.set([iron_man, spider_man, black_widow, thor, captain_america])

        # Team DC
        team_dc = Team.objects.create(name='Team DC')
        team_dc.members.set([batman, superman, wonder_woman, flash, aquaman])

        self.stdout.write('Creating activities...')

        activities_data = [
            (iron_man,        'Running',         45.0, date(2025, 1, 10)),
            (iron_man,        'Strength Training', 60.0, date(2025, 1, 12)),
            (spider_man,      'Gymnastics',      30.0, date(2025, 1, 11)),
            (spider_man,      'Running',         25.0, date(2025, 1, 13)),
            (black_widow,     'Martial Arts',    50.0, date(2025, 1, 10)),
            (black_widow,     'Yoga',            40.0, date(2025, 1, 14)),
            (thor,            'Strength Training', 90.0, date(2025, 1, 9)),
            (thor,            'Running',         60.0, date(2025, 1, 11)),
            (captain_america, 'Cycling',         75.0, date(2025, 1, 10)),
            (captain_america, 'Strength Training', 60.0, date(2025, 1, 13)),
            (batman,          'Martial Arts',    80.0, date(2025, 1, 10)),
            (batman,          'Cycling',         50.0, date(2025, 1, 12)),
            (superman,        'Flying',          30.0, date(2025, 1, 11)),
            (superman,        'Strength Training', 120.0, date(2025, 1, 13)),
            (wonder_woman,    'Martial Arts',    70.0, date(2025, 1, 10)),
            (wonder_woman,    'Archery',         45.0, date(2025, 1, 14)),
            (flash,           'Running',         15.0, date(2025, 1, 11)),
            (flash,           'Cycling',         20.0, date(2025, 1, 13)),
            (aquaman,         'Swimming',        90.0, date(2025, 1, 10)),
            (aquaman,         'Strength Training', 60.0, date(2025, 1, 12)),
        ]

        for user, activity_type, duration, act_date in activities_data:
            Activity.objects.create(
                user=user,
                activity_type=activity_type,
                duration=duration,
                date=act_date,
            )

        self.stdout.write('Creating leaderboard...')

        leaderboard_data = [
            (iron_man,        4850),
            (spider_man,      3200),
            (black_widow,     4100),
            (thor,            5500),
            (captain_america, 4750),
            (batman,          4900),
            (superman,        5800),
            (wonder_woman,    5100),
            (flash,           4400),
            (aquaman,         4200),
        ]

        for user, score in leaderboard_data:
            Leaderboard.objects.create(user=user, score=score)

        self.stdout.write('Creating workouts...')

        workouts_data = [
            ('Avengers Endurance Run',  'A 5km run at moderate pace to build cardiovascular endurance. Inspired by Steve Rogers.', 45.0),
            ('Iron Man Power Circuit',  'Full-body circuit training with push-ups, pull-ups, squats, and core work. 3 sets of 15 reps.', 60.0),
            ('Spider Agility Drill',    'Agility ladder drills, box jumps, and plyometric exercises to improve speed and coordination.', 30.0),
            ('Thor Strength Session',   'Heavy compound lifts: deadlifts, bench press, overhead press, and barbell rows.', 90.0),
            ('Black Widow Combat Prep', 'Dynamic stretching, shadowboxing, and martial arts combinations for flexibility and core strength.', 50.0),
            ('Batman Dark Knight Circuit', 'High-intensity interval training combining body weight exercises and combat conditioning.', 80.0),
            ('Aquaman Swim Intervals', 'Swimming intervals: 8 x 100m at race pace with 30 seconds rest. Core stability included.', 90.0),
            ('Flash Speed Burst',       'Short sprint intervals of 50m and 100m with full recovery. Focus on acceleration technique.', 20.0),
            ('Wonder Woman Warrior Yoga', 'Power yoga flow targeting strength, balance, and mental focus. Includes warrior poses and inversions.', 60.0),
            ('Justice League Full Body', 'Team-inspired cross-training: running, swimming, strength, and flexibility combined into one mega session.', 120.0),
        ]

        for name, description, duration in workouts_data:
            Workout.objects.create(name=name, description=description, duration=duration)

        self.stdout.write(self.style.SUCCESS('Database successfully populated with superhero test data!'))
        self.stdout.write(f'  Users:       {User.objects.count()}')
        self.stdout.write(f'  Teams:       {Team.objects.count()}')
        self.stdout.write(f'  Activities:  {Activity.objects.count()}')
        self.stdout.write(f'  Leaderboard: {Leaderboard.objects.count()}')
        self.stdout.write(f'  Workouts:    {Workout.objects.count()}')
