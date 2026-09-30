# coding=utf-8
"""
    @project: Ragent
    @Author：orangelop
    @file： system.py
    @date：2025/6/4 16:01
    @desc:
"""
import os

from rest_framework import serializers

from common.utils.rsa_util import get_key_pair_by_sql


class SystemProfileResponseSerializer(serializers.Serializer):
    version = serializers.CharField(required=True, label="version")


class SystemProfileSerializer(serializers.Serializer):
    @staticmethod
    def profile():
        version = os.environ.get('RAGENT_VERSION')
        return {'version': version,
                'rsa': get_key_pair_by_sql().get('key')}
