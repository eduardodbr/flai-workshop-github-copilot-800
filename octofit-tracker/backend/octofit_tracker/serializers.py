from rest_framework import serializers
from .models import User, Team, Activity, Leaderboard, Workout


class UserSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='pk', read_only=True)

    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'age']


class TeamSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='pk', read_only=True)
    members = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Team
        fields = ['id', 'name', 'members']


class ActivitySerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='pk', read_only=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = Activity
        fields = ['id', 'user', 'activity_type', 'duration', 'date']


class LeaderboardSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='pk', read_only=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = Leaderboard
        fields = ['id', 'user', 'score']


class WorkoutSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='pk', read_only=True)

    class Meta:
        model = Workout
        fields = ['id', 'name', 'description', 'duration']
