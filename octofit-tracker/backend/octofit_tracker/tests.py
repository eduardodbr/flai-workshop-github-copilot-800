from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from .models import User, Team, Activity, Leaderboard, Workout
from datetime import date


class UserModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(
            name='Iron Man',
            email='tony.stark@avengers.com',
            age=40,
        )

    def test_user_str(self):
        self.assertEqual(str(self.user), 'Iron Man')

    def test_user_fields(self):
        self.assertEqual(self.user.name, 'Iron Man')
        self.assertEqual(self.user.email, 'tony.stark@avengers.com')
        self.assertEqual(self.user.age, 40)


class TeamModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(name='Thor', email='thor@avengers.com', age=1500)
        self.team = Team.objects.create(name='Team Marvel')
        self.team.members.add(self.user)

    def test_team_str(self):
        self.assertEqual(str(self.team), 'Team Marvel')

    def test_team_members(self):
        self.assertIn(self.user, self.team.members.all())


class ActivityModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(name='Spider-Man', email='peter@avengers.com', age=22)
        self.activity = Activity.objects.create(
            user=self.user,
            activity_type='Running',
            duration=30.0,
            date=date(2025, 1, 10),
        )

    def test_activity_str(self):
        self.assertIn('Spider-Man', str(self.activity))
        self.assertIn('Running', str(self.activity))


class LeaderboardModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(name='Superman', email='clark@justiceleague.com', age=35)
        self.entry = Leaderboard.objects.create(user=self.user, score=5800)

    def test_leaderboard_str(self):
        self.assertIn('Superman', str(self.entry))
        self.assertIn('5800', str(self.entry))


class WorkoutModelTest(TestCase):
    def setUp(self):
        self.workout = Workout.objects.create(
            name='Avengers Endurance Run',
            description='A 5km run at moderate pace.',
            duration=45.0,
        )

    def test_workout_str(self):
        self.assertEqual(str(self.workout), 'Avengers Endurance Run')


# ── API endpoint tests ──────────────────────────────────────────────────────────

class UserAPITest(APITestCase):
    def setUp(self):
        self.user = User.objects.create(name='Black Widow', email='natasha@avengers.com', age=35)

    def test_list_users(self):
        url = reverse('user-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_user(self):
        url = reverse('user-detail', args=[self.user.pk])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Black Widow')


class TeamAPITest(APITestCase):
    def setUp(self):
        self.user = User.objects.create(name='Batman', email='bruce@justiceleague.com', age=38)
        self.team = Team.objects.create(name='Team DC')
        self.team.members.add(self.user)

    def test_list_teams(self):
        url = reverse('team-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_team(self):
        url = reverse('team-detail', args=[self.team.pk])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Team DC')


class ActivityAPITest(APITestCase):
    def setUp(self):
        self.user = User.objects.create(name='Captain America', email='steve@avengers.com', age=105)
        self.activity = Activity.objects.create(
            user=self.user,
            activity_type='Cycling',
            duration=75.0,
            date=date(2025, 1, 10),
        )

    def test_list_activities(self):
        url = reverse('activity-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_activity(self):
        url = reverse('activity-detail', args=[self.activity.pk])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['activity_type'], 'Cycling')


class LeaderboardAPITest(APITestCase):
    def setUp(self):
        self.user = User.objects.create(name='Wonder Woman', email='diana@justiceleague.com', age=3000)
        self.entry = Leaderboard.objects.create(user=self.user, score=5100)

    def test_list_leaderboard(self):
        url = reverse('leaderboard-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_leaderboard_entry(self):
        url = reverse('leaderboard-detail', args=[self.entry.pk])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['score'], 5100)


class WorkoutAPITest(APITestCase):
    def setUp(self):
        self.workout = Workout.objects.create(
            name='Flash Speed Burst',
            description='Short sprint intervals.',
            duration=20.0,
        )

    def test_list_workouts(self):
        url = reverse('workout-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_workout(self):
        url = reverse('workout-detail', args=[self.workout.pk])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Flash Speed Burst')


class ApiRootTest(APITestCase):
    def test_api_root(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('users', response.data)
        self.assertIn('teams', response.data)
        self.assertIn('activities', response.data)
        self.assertIn('leaderboard', response.data)
        self.assertIn('workouts', response.data)
