#!/d/Libraries/Python/2.7/pythonw.exe

__author__="Victor Petrov <victor_petrov@harvard.edu>"
__date__ ="$Jan 17, 2011 11:25:38 AM$"
program_version="OnlineScoring Release Builder v.0.1";

import argparse;
import os;
import os.path;
import shutil;
import subprocess;
import tempfile;

HG="hg";
DOT_HG=".hg";
REPO_URL='https://onlinescoring.googlecode.com/hg/';

def main():
    #Parse arguments
    args=parseArguments();
    #Check arguments
    checkArguments(args);

    #Create temporary directory
    tmppath=tempfile.mkdtemp(suffix=str(os.getpid()),prefix="onlinescoring-build-release-");
    #Destination directory name
    destname=args.name+"-"+args.tag;

    if os.path.exists(destname):
        raise Exception("Destination folder "+destname+" already exists.");

    #Build the command to clone the onlinescoring repository
    os.chdir(tmppath);
    cmd=HG+" clone -r "+args.tag+" "+REPO_URL+" "+destname    
    #Run Mercurial
    subprocess.check_output(cmd,stderr=subprocess.STDOUT);

    #Remove Mercurial-related directories and files
    shutil.rmtree(destname+"/"+DOT_HG);
    os.remove(destname+"/.hgtags");
    os.remove(destname+"/.hgignore");

    #Run tar to create a distribution file
    destfile=destname+".tar.gz";
    cmd="tar -zcvf "+destfile+" "+destname;
    subprocess.check_output(cmd,stderr=subprocess.STDOUT);

    if not os.path.isfile(destfile):
        raise Exception("Failed to create "+destfile);

    fullpath=os.path.abspath(destfile);
    fullpath.replace('\\','/');
    print fullpath;


def checkArguments(args):
    if args.tag==None:
        raise Exception("Please specify the Mercurial tag to use.");

#------------------------------
# Parses command line arguments
#------------------------------
def parseArguments():
    argparser=argparse.ArgumentParser(description="Builds a release of OnlineScoring",
                                    epilog="Author: "+__author__+"\r"+__date__);

    argparser.add_argument('-n','--name',dest='name',action='store',metavar='NAME',
                            help='The title of the program',default='onlinescoring');

    argparser.add_argument('-t','--tag',dest='tag',action='store',metavar='TAG',
                            required=True,help='Mercurial tag to use');

    return argparser.parse_args();


#The End
if __name__=="__main__":
	main();
