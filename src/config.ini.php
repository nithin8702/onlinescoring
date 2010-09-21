;<?php die('Welcome to the dark side of the Moon.'); ?>
;config.ini.php
;This is the global configuration file for OnlineScoring.
;Please modify the [Database] section according to your setup.
;
;Author: Victor Petrov <victor_petrov@harvard.edu>
;Date:   July 20, 2010
;Legal:
; Copyright © 2010 The President and Fellows of Harvard College
; Copyright © 2010 The Neuroinformatics Research Group at Harvard University
;
; This program is free software: you can redistribute it and/or modify
; it under the terms of the GNU General Public License as published by
; the Free Software Foundation, either version 3 of the License, or
; (at your option) any later version.
; This program is distributed in the hope that it will be useful,
; but WITHOUT ANY WARRANTY; without even the implied warranty of
; MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
; GNU General Public License for more details.
; You should have received a copy of the GNU General Public License
; along with this program. If not, see <http://www.gnu.org/licenses/>.

[Mail]
host="smtp.fas.harvard.edu"
from='NRG Support <support@neuroinfo.org>'

[Database]
host='127.0.0.1'
port=3301
user='root'
pass='%root1'
name='onlinescoring'

[IssueReport]
to="support@neuroinfo.org"
subject="Online Scoring Issue Report"

[UserRegistration]
to="support@neuroinfo.org"
subject="New User Registration Request"