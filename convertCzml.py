#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Oct  2 16:03:17 2021

@author: charvichoudhary
"""
import tle2czml
# tle2czml.create_czml("indianAsat_debris.txt", outputfile_path="indianAsat_debris.czml")
# tle2czml.create_czml("chineseAsat_debris.txt", outputfile_path="chineseAsat_debris.czml")
tle2czml.create_czml("iridium33_debris.txt", outputfile_path="iridium33_debris.czml")
# tle2czml.create_czml("cosmos2251_debris.txt", outputfile_path="cosmos2251_debris.czml")