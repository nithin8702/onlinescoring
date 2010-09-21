/* states.js tabsize=4
 *
 * A list of all states in the US conveniently formatted as an Ext ArrayStore.
 *
 * @author  Victor Petrov <victor_petrov@harvard.edu>
 * @date    July 20, 2010
 * @copyright (c) 2010 The Presidents and Fellows of Harvard College
 * @copyright (c) 2010 The Neuroinformatics Research Group at Harvard University
 * @license   GPLv3 <http://www.gnu.org/licenses/gpl-3.0.txt>
 * -----------------------------------------------------------------------------
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * -----------------------------------------------------------------------------
 */

Ext.namespace('NRG.Store');

NRG.Store.States=new Ext.data.ArrayStore({
    id:0,
    fields:['state','name'],
    data:[
           ['AL','Alabama'],
           ['AK','Alaska'],
           ['AZ','Arizona'],
           ['AR','Arkansas'],
           ['CA','California'],
           ['CO','Colorado'],
           ['CT','Connecticut'],
           ['DE','Delaware'],
           ['DC','District Of Columbia'],
           ['FL','Florida'],
           ['GA','Georgia'],
           ['HI','Hawaii'],
           ['ID','Idaho'],
           ['IL','Illinois'],
           ['IN','Indiana'],
           ['IA','Iowa'],
           ['KS','Kansas'],
           ['KY','Kentucky'],
           ['LA','Louisiana'],
           ['ME','Maine'],
           ['MD','Maryland'],
           ['MA','Massachusetts'],
           ['MI','Michigan'],
           ['MN','Minnesota'],
           ['MS','Mississippi'],
           ['MO','Missouri'],
           ['MT','Montana'],
           ['NE','Nebraska'],
           ['NV','Nevada'],
           ['NH','New Hampshire'],
           ['NJ','New Jersey'],
           ['NM','New Mexico'],
           ['NY','New York'],
           ['NC','North Carolina'],
           ['ND','North Dakota'],
           ['OH','Ohio'],
           ['OK','Oklahoma'],
           ['OR','Oregon'],
           ['PA','Pennsylvania'],
           ['PR','Puerto Rico'],
           ['RI','Rhode Island'],
           ['SC','South Carolina'],
           ['SD','South Dakota'],
           ['TN','Tennessee'],
           ['TX','Texas'],
           ['UT','Utah'],
           ['VT','Vermont'],
           ['VA','Virginia'],
           ['WA','Washington'],
           ['WV','West Virginia'],
           ['WI','Wisconsin'],
           ['WY','Wyoming']
         ]
});